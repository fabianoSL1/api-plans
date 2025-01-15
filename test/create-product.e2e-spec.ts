import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { PlanModule } from '../src/plans/infra/plan.module';
import { CreateProductRequest } from '../src/plans/application/dto/create-product.dto';

describe('Create product use case', () => {
  let app: INestApplication;
  let planId: string;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [PlanModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(() => {
    app.close();
  });

  it('POST /plans/:id/products', async () => {
    const plan = await request(app.getHttpServer())
      .post('/plans')
      .send({
        name: 'plan',
        products: [
          {
            name: 'product 1',
          },
        ],
      });

    planId = plan.body.id;

    const body: CreateProductRequest = {
      name: 'product 2',
      describe: 'nice',
    };

    const response = await request(app.getHttpServer())
      .post(`/plans/${planId}/products`)
      .send(body);

    expect(response.status).toBe(201);

    expect(response.body.id).toBeDefined();
    expect(response.body.name).toBe(body.name);
    expect(response.body.describe).toBe(body.describe);

    expect(response.body.registeredAt).toBeUndefined();
    expect(response.body.removedAt).toBeUndefined();
  });

  it('POST /plans/:id/products', async () => {
    const body: CreateProductRequest = {
      name: '',
      describe: 'nice',
    };

    const response = await request(app.getHttpServer())
      .post(`/plans/${planId}/products`)
      .send(body);

    expect(response.status).toBe(400);

    expect(response.body.message).toBeDefined();
  });
});
