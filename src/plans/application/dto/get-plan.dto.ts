import { Plan } from '../../domain/entites/plan.entity';
import { Product } from '../../domain/entites/product.entity';

export type GetPlanProduct = {
  id: string;
  name: string;
  describe: string | null;
};

export type GetPlanResponse = Omit<Plan, 'products'> & {
  available_products: GetPlanProduct[];
  history: Product[];
};
