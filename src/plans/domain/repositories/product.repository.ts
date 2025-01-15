import { Product } from '../entites/product.entity';
import { Page } from './page';

export interface ProductRepository {
  listByPlan(
    planId: string,
    page: number,
    size: number,
  ): Promise<Page<Product>>;
  get(productId: string): Promise<Product | null>;
  save(product: Product, planId: string): Promise<Product>;
  update(product: Product): Promise<void>;
}
