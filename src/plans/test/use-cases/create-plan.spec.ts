import { CreatePlanUseCase } from '../../application/use-cases/create-plan';
import {
  createCasesToError,
  mockCreateRequest,
  mockPlanRepository,
} from '../mocks/plan.mock';

describe('create plan use case', () => {
  let createPlan: CreatePlanUseCase;

  beforeEach(() => {
    jest.clearAllMocks();
    createPlan = new CreatePlanUseCase(mockPlanRepository);
  });

  it.each(createCasesToError)('%s', async (_, input) => {
    expect(async () => await createPlan.execute(input)).rejects.toThrow();
  });

  it('when given valid request then create plan', async () => {
    const result = await createPlan.execute(mockCreateRequest);
    expect(result).toBeDefined();
    expect(result.products.length).toBeGreaterThan(0);
  });
});
