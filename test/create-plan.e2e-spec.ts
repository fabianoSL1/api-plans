import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { PlanModule } from '../src/plans/infra/plan.module';
import { CreatePlanRequest } from '../src/plans/application/dto/create-plan.dto';

const createPlanErrorCases: [string, CreatePlanRequest][] = [
  [
    'when products is empty then 400',
    {
      name: 'plan',
      products: [],
    },
  ],
  [
    'when plan name is blank then 400',
    {
      name: '',
      products: [{ name: 'product' }],
    },
  ],
  [
    'when product name is blank then 400',
    {
      name: 'plan',
      products: [{ name: '' }],
    },
  ],
];

describe('Create plan use case', () => {
  let app: INestApplication;

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

  it.each(createPlanErrorCases)('/', async (_, body) => {
    const response = await request(app.getHttpServer())
      .post('/plans')
      .send(body);

    expect(response.status).toBe(400);
    expect(response.body.message).toBeDefined();
    expect(response.body.message.length).toBeGreaterThan(1);
  });

  it('/POST plans', async () => {
    const body: CreatePlanRequest = {
      name: 'plan',
      products: [
        {
          name: 'product',
        },
      ],
    };

    const response = await request(app.getHttpServer())
      .post('/plans')
      .send(body);

    expect(response.status).toBe(201);
    expect(response.body.id).toBeDefined();
    expect(response.body.name).toBe(body.name);

    expect(response.body.products[0].id).toBeDefined();
    expect(response.body.products[0].name).toBe(body.products[0].name);
    expect(response.body.products[0].describe).toBe(
      body.products[0].describe ?? null,
    );
    expect(response.body.products[0].registeredAt).toBeUndefined();
    expect(response.body.products[0].removedAt).toBeUndefined();
  });
});
