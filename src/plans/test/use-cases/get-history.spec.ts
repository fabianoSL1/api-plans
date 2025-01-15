import { NotFound } from '../../../shared/exceptions/notFound';
import { GetPlanHistoryUseCase } from '../../application/use-cases/get-plan-history';
import { Plan } from '../../domain/entites/plan.entity';
import { Product } from '../../domain/entites/product.entity';
import { mockPlanRepository } from '../mocks/plan.mock';
import { mockProductRepository } from '../mocks/product.mock';

describe('Get history use case', () => {
  let getHistory: GetPlanHistoryUseCase;

  beforeAll(() => {
    mockProductRepository.listByPlan.mockImplementation(
      async (_, page, size) => {
        const products = [];
        for (let i = 0; i <= 100; i++) {
          const product = new Product(
            `product ${i + 1}`,
            null,
            new Date(),
            null,
          );
          product.id = i.toString();
          products.push(product);
        }
        const start = (page - 1) * size;
        return {
          results: products.slice(start, start + size),
          page: {
            current: page,
            size: size,
            total: Math.ceil(products.length / size),
          },
        };
      },
    );
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

    expect(result.results).toBeDefined();
    expect(result.page).toBeDefined();
  });
});
