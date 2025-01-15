import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { PlanModule } from '../src/plans/infra/plan.module';
import * as request from 'supertest';

describe('Remove product use case', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [PlanModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it('when valid input then remove product', async () => {
    let plan = await request(app.getHttpServer())
      .post('/plans')
      .send({
        name: 'plan',
        products: [
          {
            name: 'product',
          },
        ],
      });

    const planId = plan.body.id;
    const productId = plan.body.products[0].id;

    const response = await request(app.getHttpServer())
      .delete(`/plans/${planId}/products/${productId}`)
      .send();

    expect(response.status).toBe(204);

    plan = await request(app.getHttpServer()).get(`/plans/${planId}`).send();
    expect(plan.body.products.length).toBe(0);
  });

  it('when remove twice then 400', async () => {
    const plan = await request(app.getHttpServer())
      .post('/plans')
      .send({
        name: 'plan',
        products: [
          {
            name: 'product',
          },
        ],
      });

    const planId = plan.body.id;
    const productId = plan.body.products[0].id;

    await request(app.getHttpServer())
      .delete(`/plans/${planId}/products/${productId}`)
      .send();

    const response = await request(app.getHttpServer())
      .delete(`/plans/${planId}/products/${productId}`)
      .send();

    expect(response.status).toBe(400);
    expect(response.body.message).toBeDefined();
  });

  it('when remove twice then 400', async () => {
    const plan = await request(app.getHttpServer())
      .post('/plans')
      .send({
        name: 'plan',
        products: [
          {
            name: 'product',
          },
        ],
      });

    const productId = plan.body.products[0].id;

    const response = await request(app.getHttpServer())
      .delete(`/plans/123/products/${productId}`)
      .send();

    expect(response.status).toBe(404);
    expect(response.body.message).toBeDefined();
  });
});
