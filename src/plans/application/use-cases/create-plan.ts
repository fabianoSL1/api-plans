import { CreatePlanRequest, CreatePlanResponse } from '../dto/create-plan.dto';
import { Plan } from '../../domain/entites/plan.entity';
import { Product } from '../../domain/entites/product.entity';
import { PlanRepository } from '../../domain/repositories/plan.repository';
import { InvalidInput } from '../../../shared/exceptions/invalidInput';
import { CreateProductUseCase } from './create-product';

export class CreatePlanUseCase {
  constructor(private readonly planRepository: PlanRepository) {}

  async execute(request: CreatePlanRequest): Promise<CreatePlanResponse> {
    if (request.products.length == 0) {
      throw new InvalidInput('o plano deve ter pelo menos um produto');
    }

    const products: Map<string, Product> = new Map();

    for (const productRequest of request.products) {
      if (products.has(productRequest.name)) {
        throw new InvalidInput(
          `O produto '${productRequest.name}' foi inserido duas vezes`,
        );
      }

      products.set(
        productRequest.name,
        CreateProductUseCase.makeProduct(productRequest),
      );
    }

    const plan = new Plan(request.name, Array.from(products.values()));

    await this.planRepository.save(plan);

    return this.makeResponse(plan);
  }

  private makeResponse(plan: Plan): CreatePlanResponse {
    return {
      id: plan.id,
      name: plan.name,
      products: plan.products.map(({ id, name, describe }) => ({
        id,
        name,
        describe,
      })),
    };
  }
}
