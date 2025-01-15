import { InvalidInput } from '../../../shared/exceptions/invalidInput';
import { NotFound } from '../../../shared/exceptions/notFound';
import { RemoveProductUseCase } from '../../application/use-cases/remove-product';
import { Product } from '../../domain/entites/product.entity';
import { mockProductRepository } from '../mocks/product.mock';

describe('Remove product use case', () => {
  let removeProduct: RemoveProductUseCase;

  beforeAll(() => {
    removeProduct = new RemoveProductUseCase(mockProductRepository);
  });

  it('when not found then error', () => {
    expect(() => removeProduct.execute('1')).rejects.toBeInstanceOf(NotFound);
  });

  it('when already removed then error', () => {
    mockProductRepository.get.mockResolvedValue(
      new Product('1', null, new Date(), new Date()),
    );

    expect(() => removeProduct.execute('1')).rejects.toBeInstanceOf(
      InvalidInput,
    );
  });
  it('when product then ok', async () => {
    const product = new Product('product', null, new Date(), null);
    mockProductRepository.get.mockResolvedValue(product);

    await removeProduct.execute('1');

    expect(product.removedAt).toBeInstanceOf(Date);
  });
});
