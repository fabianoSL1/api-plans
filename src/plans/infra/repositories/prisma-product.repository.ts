import { Injectable } from '@nestjs/common';
import { Product as ProductEntity } from '../../domain/entites/product.entity';
import { ProductRepository } from '../../domain/repositories/product.repository';
import { PrismaService } from '../../../shared/infra/services/prisma.service';
import { Product, ProductsOnPlans } from '@prisma/client';

type Relational = ProductsOnPlans & { product: Product };

@Injectable()
export class PrismaProductRepository implements ProductRepository {
  constructor(private readonly prisma: PrismaService) {}

  async listByPlan(
    planId: string,
    page: number,
    size: number,
  ): Promise<[ProductEntity[], number]> {
    const promiseList = this.prisma.productsOnPlans.findMany({
      where: { planId },
      include: {
        product: true,
      },
      skip: (page - 1) * size,
      take: size,
    });

    const promiseCount = this.prisma.productsOnPlans.count({
      where: { planId },
    });

    const [list, count] = await Promise.all([promiseList, promiseCount]);

    return [list.map((item) => this.parse(item)), count];
  }

  async get(productId: string, planId: string): Promise<ProductEntity | null> {
    const result = await this.prisma.productsOnPlans.findFirst({
      where: {
        productId: parseInt(productId),
        planId: planId,
      },
      include: {
        product: true,
      },
    });

    if (!result) {
      return null;
    }

    return this.parse(result);
  }

  private parse(relation: Relational): ProductEntity {
    const _product = new ProductEntity(
      relation.product.name,
      relation.product.describe,
      relation.registeredAt,
      relation.removedAt,
    );
    _product.id = relation.product.id.toString();
    _product.planId = relation.planId;
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
        plans: {
          update: {
            where: {
              planId_productId: {
                planId: product.planId,
                productId: parseInt(product.id),
              },
            },
            data: {
              available: product.isAvailable(),
              removedAt: product.removedAt,
            },
          },
        },
      },
      where: {
        id: parseInt(product.id),
      },
    });
  }

  private async create(product: ProductEntity): Promise<void> {
    const stored = await this.prisma.productsOnPlans.create({
      data: {
        product: {
          connectOrCreate: {
            create: {
              name: product.name,
              describe: product.describe,
            },
            where: {
              name: product.name,
            },
          },
        },
        available: product.isAvailable(),
        plan: {
          connect: {
            id: product.planId,
          },
        },
        registeredAt: product.registeredAt,
      },
    });

    product.id = stored.productId.toString();
  }
}
