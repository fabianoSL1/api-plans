import { Injectable } from '@nestjs/common';
import { Product as ProductEntity } from '../../domain/entites/product.entity';
import { ProductRepository } from '../../domain/repositories/product.repository';
import { PrismaService } from '../../../shared/infra/services/prisma.service';
import { Product } from '@prisma/client';

@Injectable()
export class PrismaProductRepository implements ProductRepository {
  constructor(private readonly prisma: PrismaService) {}

  async listByPlan(
    planId: string,
    page: number,
    size: number,
  ): Promise<[ProductEntity[], number]> {
    const promiseList = this.prisma.product.findMany({
      where: { planId },
      skip: (page - 1) * size,
      take: size,
    });

    const promiseCount = this.prisma.product.count({ where: { planId } });

    const [list, count] = await Promise.all([promiseList, promiseCount]);

    return [list.map((item) => this.parse(item)), count];
  }

  async get(productId: string): Promise<ProductEntity | null> {
    const result = await this.prisma.product.findFirst({
      where: {
        id: parseInt(productId),
      },
    });

    if (!result) {
      return null;
    }

    return this.parse(result);
  }

  private parse(product: Product): ProductEntity {
    const _product = new ProductEntity(
      product.name,
      product.describe,
      product.registeredAt,
      product.removedAt,
    );
    _product.id = product.id.toString();
    _product.planId = product.planId;
    return _product;
  }

  async save(product: ProductEntity): Promise<void> {
    if (product.id) {
      await this.update(product);
    } else {
      await this.create(product);
    }
  }

  private async update(product: ProductEntity): Promise<void> {
    await this.prisma.product.update({
      data: {
        name: product.name,
        describe: product.describe,
        removedAt: product.removedAt,
        available: product.isAvailable(),
      },
      where: {
        id: parseInt(product.id),
      },
    });
  }

  private async create(product: ProductEntity): Promise<void> {
    const stored = await this.prisma.product.create({
      data: {
        available: product.isAvailable(),
        name: product.name,
        planId: product.planId,
        registeredAt: product.registeredAt,
      },
    });

    product.id = stored.id.toString();
  }
}
