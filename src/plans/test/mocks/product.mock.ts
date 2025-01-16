import { CreateProductRequest } from '../../application/dto/create-product.dto';
import { ProductRepository } from '../../domain/repositories/product.repository';

export const mockProductRepository: jest.Mocked<ProductRepository> = {
  listByPlan: jest.fn(),
  save: jest.fn(),
  get: jest.fn(),
};

export const mockCreateProductRequest: CreateProductRequest = {
  name: 'product',
};
