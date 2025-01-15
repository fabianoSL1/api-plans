import { Injectable } from '@nestjs/common';
import { Product as ProductEntity } from '../../domain/entites/product.entity';
import { ProductRepository } from '../../domain/repositories/product.repository';
import { PrismaService } from '../../../shared/infra/prisma.service';
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

  async save(product: ProductEntity, planId: string): Promise<ProductEntity> {
    const result = await this.prisma.product.create({
      data: {
        name: product.name,
        describe: product.describe,
        registeredAt: product.registeredAt,
        planId: planId,
        available: product.isAvailable(),
      },
    });

    return this.parse(result);
  }

  async update(product: ProductEntity): Promise<void> {
    await this.prisma.product.update({
      where: { id: parseInt(product.id) },
      data: {
        name: product.name,
        describe: product.describe,
        removedAt: product.removedAt,
        available: product.isAvailable(),
      },
    });
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
}
