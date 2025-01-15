import { CreatePlanRequest } from '../../application/dto/create-plan.dto';
import { Plan } from '../../domain/entites/plan.entity';
import { Product } from '../../domain/entites/product.entity';
import { PlanRepository } from '../../domain/repositories/plan.repository';

export const mockPlanRepository: jest.Mocked<PlanRepository> = {
  save: jest.fn(),
  get: jest.fn(),
};

export const mockCreateRequest: CreatePlanRequest = {
  name: 'plan',
  products: [{ name: 'product' }],
};

const productsMock = [
  new Product('product1', null, new Date(2023, 0), null),
  new Product('product2', null, new Date(2024, 3), new Date(2024, 4)),
];

export const mockPlan = new Plan('plan', productsMock);
