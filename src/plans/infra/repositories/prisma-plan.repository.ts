import { Injectable } from '@nestjs/common';
import { Product, Plan, ProductsOnPlans } from '@prisma/client';
import { Plan as PlanEntity } from '../../domain/entites/plan.entity';
import { PlanRepository } from '../../domain/repositories/plan.repository';
import { PrismaService } from '../../../shared/infra/services/prisma.service';
import { Product as ProductEntity } from '../../domain/entites/product.entity';

type Relational = ProductsOnPlans & { product: Product };

@Injectable()
export class PrismaPlanRepository implements PlanRepository {
  constructor(private readonly prisma: PrismaService) {}

  async get(planId: string): Promise<PlanEntity | null> {
    const result = await this.prisma.plan.findFirst({
      where: { id: planId },
      include: {
        products: {
          where: {
            available: true,
          },
          include: {
            product: true,
          },
        },
      },
    });

    if (!result) {
      return null;
    }

    const { products, ...plan } = result;

    return this.parse(plan, products);
  }

  async save(plan: PlanEntity): Promise<void> {
    return await this.prisma.$transaction(async (tx) => {
      const result = await tx.plan.create({
        data: {
          name: plan.name,
          products: {
            create: plan.products.map((product) => {
              return {
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
                registeredAt: product.registeredAt,
              };
            }),
          },
        },
        include: {
          products: {
            include: {
              product: true,
            },
          },
        },
      });

      plan.id = result.id.toString();

      const { products } = result;
      const stored = this.parse(result, products);

      plan.products = stored.products;
    });
  }

  private parse(plan: Plan, relations: Relational[]): PlanEntity {
    const _products = [];

    for (const relation of relations) {
      const _product = new ProductEntity(
        relation.product.name,
        relation.product.describe,
        relation.registeredAt,
        relation.removedAt,
      );

      _product.id = relation.product.id.toString();
      _product.planId = plan.id;
      _products.push(_product);
    }

    const _plan = new PlanEntity(plan.name, _products);
    _plan.id = plan.id;

    return _plan;
  }
}
