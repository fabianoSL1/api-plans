import { InvalidInput } from '../../../shared/exceptions/invalidInput';
import { CreatePlanRequest } from '../../application/dto/create-plan.dto';
import { CreatePlanUseCase } from '../../application/use-cases/create-plan';
import { mockPlanRepository } from '../mocks/plan.mock';

const cases: [string, CreatePlanRequest][] = [
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
  [
    'when product twice then throw',
    {
      name: 'plan',
      products: [{ name: 'product' }, { name: 'product' }],
    },
  ],
];

describe('create plan use case', () => {
  let createPlan: CreatePlanUseCase;

  beforeEach(() => {
    jest.clearAllMocks();
    createPlan = new CreatePlanUseCase(mockPlanRepository);
  });

  it.each(cases)('%s', (_, input) => {
    expect(() => createPlan.execute(input)).rejects.toBeInstanceOf(
      InvalidInput,
    );
  });
});
