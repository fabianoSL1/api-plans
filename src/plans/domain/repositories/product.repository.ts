import { Product } from '../entites/product.entity';

export interface ProductRepository {
  save(product: Product, planId: string): Promise<Product>;
  save(product: Product): Promise<Product>;
}
