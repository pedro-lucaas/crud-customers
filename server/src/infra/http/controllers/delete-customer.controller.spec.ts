import { app } from '@test/global-setup';
import request from 'supertest';

describe('Delete customer controller', () => {
  it('should return status 404 when customer is not found', async () => {
    const response = await request(app.getHttpServer())
      .delete('/customers/customer-id');

    expect(response.body.statusCode).toBe(404);
    expect(response.body.message).toEqual('Cliente não encontrado');
  });
});
