import { Body, Controller, Delete, Inject, Param, Post } from '@nestjs/common';
import { CreateProductRequest } from '../../application/dto/create-product.dto';
import { CreateProductUseCase } from '../../application/use-cases/create-product';
import { RemoveProductUseCase } from '../../application/use-cases/remove-product';
import { PlanRepository } from '../../domain/repositories/plan.repository';
import { ProductRepository } from '../../domain/repositories/product.repository';

@Controller('plans/:planId/products')
export class ProductController {
  constructor(
    @Inject('PlanRepository') private readonly planRepository: PlanRepository,
    @Inject('ProductRepository')
    private readonly productRepository: ProductRepository,
  ) {}

  @Post()
  async post(
    @Param('planId') planId: string,
    @Body() body: CreateProductRequest,
  ) {
    const createProduct = new CreateProductUseCase(
      this.productRepository,
      this.planRepository,
    );

    return createProduct.execute(planId, body);
  }

  @Delete(':id')
  async destroy(@Param('planId') productId: string) {
    const removeProduct = new RemoveProductUseCase(this.productRepository);

    return await removeProduct.execute(productId);
  }
}
