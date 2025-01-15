import { NotFound } from '../../../shared/exceptions/notFound';
import { CreateProductUseCase } from '../../application/use-cases/create-product';
import { mockPlanRepository } from '../mocks/plan.mock';
import {
  mockCreateProductRequest,
  mockProductRepository,
} from '../mocks/product.mock';

describe('create product use case', () => {
  let createProduct: CreateProductUseCase;

  beforeEach(() => {
    jest.clearAllMocks();

    createProduct = new CreateProductUseCase(
      mockProductRepository,
      mockPlanRepository,
    );
  });

  it('when plan not found then error', () => {
    mockPlanRepository.get.mockResolvedValueOnce(null);

    expect(() =>
      createProduct.execute('1', mockCreateProductRequest),
    ).rejects.toBeInstanceOf(NotFound);
  });
});
