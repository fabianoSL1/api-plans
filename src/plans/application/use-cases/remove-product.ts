import { ProductRepository } from '../../domain/repositories/product.repository';
import { NotFound } from '../../../shared/exceptions/notFound';
import { InvalidInput } from '../../../shared/exceptions/invalidInput';

export class RemoveProductUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(productId: string, planId: string): Promise<void> {
    const product = await this.productRepository.get(productId, planId);

    if (product === null) {
      throw new NotFound('produto não encontrado');
    }

    if (product.removedAt) {
      throw new InvalidInput('produto já foi removido');
    }

    product.removedAt = new Date();

    await this.productRepository.save(product);
  }
}
