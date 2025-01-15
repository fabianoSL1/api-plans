import { Product } from '../entites/product.entity';

export interface ProductRepository {
  get(productId: string): Promise<Product | null>;
  save(product: Product, planId: string): Promise<Product>;
  update(product: Product): Promise<void>;
}
