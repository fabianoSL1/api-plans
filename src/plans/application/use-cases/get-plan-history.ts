import { NotFound } from '../../../shared/exceptions/notFound';
import { PlanRepository } from '../../domain/repositories/plan.repository';
import { ProductRepository } from '../../domain/repositories/product.repository';

export class GetPlanHistoryUseCase {
  constructor(
    private readonly planRepository: PlanRepository,
    private readonly productRepository: ProductRepository,
  ) {}

  async execute(planId: string, page: number, size: number) {
    const plan = await this.planRepository.get(planId);

    if (!plan) {
      throw new NotFound('plano não encontrado');
    }

    const productsPage = await this.productRepository.listByPlan(
      planId,
      page,
      size,
    );

    return productsPage;
  }
}
