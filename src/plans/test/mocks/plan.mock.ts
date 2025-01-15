import { CreatePlanRequest } from '../../application/dto/create-plan.dto';
import { PlanRepository } from '../../domain/repositories/plan.repository';

export const mockPlanRepository: jest.Mocked<PlanRepository> = {
  save: jest.fn(),
};

mockPlanRepository.save.mockImplementation(async (plan) => {
  const callIndex = mockPlanRepository.save.mock.calls.length;

  const products = plan.products.map((product, index) => ({
    ...product,
    id: `${callIndex}${index}`,
  }));

  return {
    ...plan,
    products,
    id: callIndex.toString(),
  };
});

export const createCasesToError: [string, CreatePlanRequest][] = [
  [
    'when products is empty then throw',
    {
      name: 'plan',
      products: [],
    },
  ],
  [
    'when plan name is blank then throw',
    {
      name: '',
      products: [{ name: 'product' }],
    },
  ],
  [
    'when product name is blank then throw',
    {
      name: 'plan',
      products: [{ name: '' }],
    },
  ],
];

export const mockCreateRequest: CreatePlanRequest = {
  name: 'plan',
  products: [{ name: 'product' }],
};
