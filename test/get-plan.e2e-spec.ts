import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { PlanModule } from '../src/plans/infra/plan.module';
import * as request from 'supertest';

describe('GET /plans/:planId/products', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [PlanModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it('when found then 200', async () => {
    const body = {
      name: 'plan',
      products: [
        {
          name: 'product',
        },
        {
          name: 'product',
        },
        {
          name: 'product',
        },
      ],
    };
    const page = 1;
    const size = 1;
    const total = Math.ceil(body.products.length / size);

    const plan = await request(app.getHttpServer()).post('/plans').send(body);

    const response = await request(app.getHttpServer())
      .get(`/plans/${plan.body.id}/products?page=${page}&size=${size}`)
      .send();

    console.log(`/plans/${plan.body.id}/products?page=${page}&size=${size}`);

    expect(response.status).toBe(200);

    expect(response.body.products.length).toBe(size);
    expect(response.body.products[0].removedAt).toBeDefined();
    expect(response.body.products[0].registeredAt).toBeDefined();

    expect(response.body.page.total).toBe(total);
  });
});
