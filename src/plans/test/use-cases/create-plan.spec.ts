import { CreatePlanUseCase } from '../../application/use-cases/create-plan';
import { createCasesToError, mockPlanRepository } from '../mocks/plan.mock';

describe('create plan use case', () => {
  let createPlan: CreatePlanUseCase;

  beforeEach(() => {
    jest.clearAllMocks();
    createPlan = new CreatePlanUseCase(mockPlanRepository);
  });

  it.each(createCasesToError)('%s', (_, input) => {
    expect(() => createPlan.execute(input)).rejects.toThrow();
  });
});
