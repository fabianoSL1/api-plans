import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { PlanModule } from '../src/plans/infra/plan.module';
import * as request from 'supertest';

describe('GET /plans/:planId', () => {
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
          name: 'product 2',
        },
      ],
    };

    const plan = await request(app.getHttpServer()).post('/plans').send(body);

    const response = await request(app.getHttpServer())
      .get(`/plans/${plan.body.id}`)
      .send();

    expect(response.status).toBe(200);
    expect(response.body.id).toBeDefined();
    expect(response.body.name).toBe(body.name);
    expect(response.body.products.length).toBe(2);
  });

  it('when get plan after remove product then 200', async () => {
    const body = {
      name: 'plan',
      products: [
        {
          name: 'product',
        },
        {
          name: 'product 2',
          describe: 'describe',
        },
      ],
    };

    const plan = await request(app.getHttpServer()).post('/plans').send(body);

    const planId = plan.body.id;
    const productId = plan.body.products[0].id;

    await request(app.getHttpServer())
      .delete(`/plans/${planId}/products/${productId}`)
      .send();

    const response = await request(app.getHttpServer())
      .get(`/plans/${planId}`)
      .send();

    expect(response.status).toBe(200);
    expect(response.body.products.length).toBe(1);
    expect(response.body.products[0].name).toBe(body.products[1].name);
    expect(response.body.products[0].describe).toBe(body.products[1].describe);
  });

  it('when plan not found then 404', async () => {
    const response = await request(app.getHttpServer()).get('/plans/0x').send();

    expect(response.status).toBe(404);
    expect(response.body.message).toBeDefined();
  });
});
