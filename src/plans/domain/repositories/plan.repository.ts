import { Plan } from '../entites/plan.entity';

export interface PlanRepository {
  get(planId: string): Promise<Plan | null>;
  save(plan: Plan): Promise<void>;
}
