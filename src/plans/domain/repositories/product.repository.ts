import { Product } from '../entites/product.entity';

export interface ProductRepository {
  listByPlan(
    planId: string,
    page: number,
    size: number,
  ): Promise<[Product[], number]>;
  get(productId: string): Promise<Product | null>;
  save(product: Product): Promise<void>;
}
