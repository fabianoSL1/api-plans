import { NotFound } from '../../../shared/exceptions/notFound';
import { PlanRepository } from '../../domain/repositories/plan.repository';
import { GetPlanResponse, GetPlanProduct } from '../dto/get-plan.dto';

export class GetPlanUseCase {
  constructor(private readonly planRepository: PlanRepository) {}

  async execute(planId: string): Promise<GetPlanResponse> {
    const plan = await this.planRepository.get(planId);

    if (!plan) {
      throw new NotFound('plano não encontrado');
    }

    const products: GetPlanProduct[] = [];

    for (const product of plan.products) {
      if (product.isAvailable()) {
        const { id, name, describe } = product;
        products.push({ id, name, describe });
      }
    }

    return {
      id: plan.id,
      name: plan.name,
      products,
    };
  }
}
