import { Injectable } from '@nestjs/common';
import { Product, Plan } from '@prisma/client';
import { Plan as PlanEntity } from '../../domain/entites/plan.entity';
import { PlanRepository } from '../../domain/repositories/plan.repository';
import { PrismaService } from '../../../shared/infra/services/prisma.service';
import { Product as ProductEntity } from '../../domain/entites/product.entity';

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
      const resultPlans = await tx.plan.create({
        data: {
          name: plan.name,
        },
      });

      const resultProducts = await tx.product.createManyAndReturn({
        data: plan.products.map((product) => ({
          name: product.name,
          describe: product.describe,
          registeredAt: product.registeredAt,
          available: product.isAvailable(),
          planId: resultPlans.id,
        })),
      });

      plan.id = resultPlans.id.toString();

      const stored = this.parse(resultPlans, resultProducts);

      plan.products = stored.products;
    });
  }

  private parse(plan: Plan, products: Product[]): PlanEntity {
    const _products = [];

    for (const product of products) {
      const _product = new ProductEntity(
        product.name,
        product.describe,
        product.registeredAt,
        product.removedAt,
      );

      _product.id = product.id.toString();
      _product.planId = plan.id;
      _products.push(_product);
    }

    const _plan = new PlanEntity(plan.name, _products);
    _plan.id = plan.id;

    return _plan;
  }
}
