import { CreatePlanRequest, CreatePlanResponse } from '../dto/create-plan.dto';
import { Plan } from '../../domain/entites/plan.entity';
import { Product } from '../../domain/entites/product.entity';
import { PlanRepository } from '../../domain/repositories/plan.repository';

export class CreatePlanUseCase {
  constructor(private readonly planRepository: PlanRepository) {}

  async execute(request: CreatePlanRequest): Promise<CreatePlanResponse> {
    if (request.products.length == 0) {
      throw new Error('o plano deve ter pelo menos um produto');
    }

    const products = request.products.map((product) => new Product(product));
    const plan = new Plan({ name: request.name, products });

    return await this.planRepository.save(plan);
  }
}
