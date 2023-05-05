import { app } from '@test/global-setup';
import request from 'supertest';

describe('List customers controller', () => {
  it('should return status 200 when customers are listed', async () => {
    const response = await request(app.getHttpServer())
      .get('/customers');

    expect(response.status).toBe(200);
    expect(response.body).toBeTruthy();
    expect(response.body.items).toEqual([]);
    expect(response.body.total).toBe(0);
    expect(response.body.pageSize).toBe(10);
    expect(response.body.page).toBe(1);
  });
});
