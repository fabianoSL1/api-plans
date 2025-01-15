import { Product } from '../../domain/entites/product.entity';
import { PlanRepository } from '../../domain/repositories/plan.repository';
import { ProductRepository } from '../../domain/repositories/product.repository';
import {
  CreateProductRequest,
  CreateProductResponse,
} from '../dto/create-product.dto';
import { NotFound } from '../../../shared/exceptions/notFound';

export class CreateProductUseCase {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly planRepository: PlanRepository,
  ) {}

  async execute(
    planId: string,
    request: CreateProductRequest,
  ): Promise<CreateProductResponse> {
    const plan = await this.planRepository.get(planId);

    if (!plan) {
      throw new NotFound('plano não encontrado');
    }

    const product = CreateProductUseCase.makeProduct(request);
    return await this.productRepository.save(product, planId);
  }

  static makeProduct(request: CreateProductRequest) {
    return new Product(request.name, request.describe, new Date(), null);
  }
}
