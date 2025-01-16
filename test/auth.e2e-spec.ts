import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';

describe('POST /auth', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(() => {
    app.close();
  });

  it('when empty authorization header then 401', async () => {
    const response = await request(app.getHttpServer()).get('/plans/0x');

    expect(response.status).toBe(401);
    expect(response.body.message).toBeDefined();
  });

  it('when auth then 201', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth')
      .send({ name: 'test' });

    expect(response.status).toBe(201);
    expect(response.body.token).toBeDefined();
    expect(response.body.duration).toBeDefined();
  });

  it('when auth then 201', async () => {
    const auth = await request(app.getHttpServer())
      .post('/auth')
      .send({ name: 'test' });

    const response = await request(app.getHttpServer())
      .post('/plans')
      .auth(auth.body.token, { type: 'bearer' })
      .send({
        name: 'plan auth',
        products: [
          {
            name: 'product auth',
          },
        ],
      });

    expect(response.status).not.toBe(401);
  });
});
