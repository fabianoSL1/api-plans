import { CreateProductRequest } from '../../application/dto/create-product.dto';
import { ProductRepository } from '../../domain/repositories/product.repository';

export const mockProductRepository: jest.Mocked<ProductRepository> = {
  save: jest.fn(),
};

export const mockCreateProductRequest: CreateProductRequest = {
  name: 'product',
};
