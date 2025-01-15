import { Plan } from '../../domain/entites/plan.entity';

export type GetPlanProduct = {
  id: string;
  name: string;
  describe: string | null;
};

export type GetPlanResponse = Omit<Plan, 'products'> & {
  products: GetPlanProduct[];
};
