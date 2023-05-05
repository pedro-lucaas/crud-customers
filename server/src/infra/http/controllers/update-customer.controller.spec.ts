import { app } from '@test/global-setup';
import request from 'supertest';

describe('Update customer controller', () => {
  it('should return status 404 when customer is not found', async () => {
    const response = await request(app.getHttpServer())
      .put('/customers/customer-id')
      .send({
        name: 'John Doe'
      });

    expect(response.body.statusCode).toBe(404);
    expect(response.body.message).toEqual('Cliente não encontrado');
  });
});
