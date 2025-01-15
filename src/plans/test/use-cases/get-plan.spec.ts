import { NotFound } from '../../../shared/exceptions/notFound';
import { GetPlanUseCase } from '../../application/use-cases/get-plan';
import { mockPlan, mockPlanRepository } from '../mocks/plan.mock';

describe('', () => {
  let getPlan: GetPlanUseCase;

  beforeEach(() => {
    getPlan = new GetPlanUseCase(mockPlanRepository);
  });

  it('when plan not found then error', () => {
    expect(() => getPlan.execute('1')).rejects.toBeInstanceOf(NotFound);
  });

  it('when ok then history and available products', async () => {
    mockPlanRepository.get.mockResolvedValueOnce(mockPlan);
    const plan = await getPlan.execute('1');

    expect(plan.available_products).toBeDefined();
    expect(plan.history).toBeDefined();

    const [history] = plan.history;
    const available: typeof history = plan.available_products[0] as any;

    expect(history.registeredAt).toBeDefined();
    expect(history.removedAt).toBeDefined();

    expect(available.registeredAt).toBeUndefined();
    expect(available.registeredAt).toBeUndefined();
  });
});
