import { app } from '@test/global-setup';
import request from 'supertest';

describe('Create customer controller', () => {
  it('should return status 201 when customer is created', async () => {
    const response = await request(app.getHttpServer())
      .post('/customers')
      .send({
        name: 'John Doe',
        email: 'teste123@gmail.com',
        phone: '1199999999',
      });

    expect(response.status).toBe(201);
  });
});
