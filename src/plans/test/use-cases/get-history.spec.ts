import { NotFound } from '../../../shared/exceptions/notFound';
import { GetPlanHistoryUseCase } from '../../application/use-cases/get-plan-history';
import { Plan } from '../../domain/entites/plan.entity';
import { mockPlanRepository } from '../mocks/plan.mock';
import { mockProductRepository } from '../mocks/product.mock';

describe('Get history use case', () => {
  let getHistory: GetPlanHistoryUseCase;

  beforeAll(() => {
    mockProductRepository.listByPlan.mockResolvedValue([[], 0]);
  });

  beforeEach(() => {
    jest.clearAllMocks();

    getHistory = new GetPlanHistoryUseCase(
      mockPlanRepository,
      mockProductRepository,
    );
  });

  it('when plan not found then error', () => {
    expect(() => getHistory.execute('1', 1, 10)).rejects.toBeInstanceOf(
      NotFound,
    );
  });

  it('when plan then page', async () => {
    mockPlanRepository.get.mockResolvedValue(new Plan('plan', []));
    const result = await getHistory.execute('1', 1, 10);

    expect(result.products).toBeDefined();
    expect(result.page).toBeDefined();
  });
});
