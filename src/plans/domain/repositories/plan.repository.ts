import { Plan } from '../entites/plan.entity';

export interface PlanRepository {
  save(plan: Plan): Promise<Plan>;
}
