import { NotFound } from '../../../shared/exceptions/notFound';
import { GetPlanUseCase } from '../../application/use-cases/get-plan';
import { Product } from '../../domain/entites/product.entity';
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

    expect(plan.products).toBeDefined();
    expect(plan.products.length).toBe(1);

    const product: Product = plan.products[0] as any;

    expect(product.name).toBeDefined();
    expect(product.registeredAt).toBeUndefined();
    expect(product.registeredAt).toBeUndefined();
  });
});
