import { NotFound } from '../../../shared/exceptions/notFound';
import { Product } from '../../domain/entites/product.entity';
import { PlanRepository } from '../../domain/repositories/plan.repository';
import { GetPlanResponse, GetPlanProduct } from '../dto/get-plan.dto';

export class GetPlanUseCase {
  constructor(private readonly planRepository: PlanRepository) {}

  async execute(planId: string): Promise<GetPlanResponse> {
    const plan = await this.planRepository.get(planId);

    if (!plan) {
      throw new NotFound('plano não encontrado');
    }
    const available_products: GetPlanProduct[] = [];
    const history: Product[] = [];

    for (const product of plan.products) {
      if (!product.isAvailable()) {
        const { id, name, describe } = product;
        available_products.push({ id, name, describe });
      } else {
        history.push(product);
      }
    }

    return {
      id: plan.id,
      name: plan.name,
      available_products,
      history,
    };
  }
}
