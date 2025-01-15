import { NotFound } from '../../../shared/exceptions/notFound';
import { Product } from '../../domain/entites/product.entity';
import { PlanRepository } from '../../domain/repositories/plan.repository';
import { ProductRepository } from '../../domain/repositories/product.repository';
import { Page } from '../dto/page.dto';

export class GetPlanHistoryUseCase {
  constructor(
    private readonly planRepository: PlanRepository,
    private readonly productRepository: ProductRepository,
  ) {}

  async execute(planId: string, page: number, size: number): Promise<Page> {
    const plan = await this.planRepository.get(planId);

    if (!plan) {
      throw new NotFound('plano não encontrado');
    }

    const [products, total] = await this.productRepository.listByPlan(
      planId,
      page,
      size,
    );

    return {
      page: {
        current: page,
        size: size,
        total: Math.ceil(total / size),
      },
      products: this.orderElements(products),
    };
  }

  private orderElements(products: Product[]) {
    return products.map(({ id, name, describe, registeredAt, removedAt }) => ({
      id: isNaN(parseInt(id)) ? id : parseInt(id),
      name,
      describe,
      registeredAt,
      removedAt,
    }));
  }
}
