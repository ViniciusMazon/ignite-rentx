import { app } from '@shared/infra/http/app';
import request from 'supertest';
import { hash } from 'bcrypt';
import { v4 as uuid } from 'uuid';
import createConnection from '@shared/infra/typeorm';
import { Connection } from 'typeorm';

let connection: Connection;
describe('Create Category Controller', () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    const id = uuid();
    const password = await hash('admin', 8);

    await connection.query(
      `INSERT INTO USERS(id, name, email, password, "isAdmin", driver_license, created_at) 
      VALUES('${id}', 'admin', 'admin@rentx.com', '${password}', true, 'xxx-123', 'now()')`,
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('should be able to create a new category', async () => {
    const responseAdminToken = await request(app).post('/sessions').send({
      email: 'admin@rentx.com',
      password: 'admin',
    });

    const { token } = responseAdminToken.body;

    const response = await request(app)
      .post('/categories')
      .send({
        name: 'Category supertest name',
        description: 'Category supertest description',
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.status).toBe(201);
  });

  it('should not be able to create a new category with name existis', async () => {
    const responseAdminToken = await request(app).post('/sessions').send({
      email: 'admin@rentx.com',
      password: 'admin',
    });

    const { token } = responseAdminToken.body;

    const response = await request(app)
      .post('/categories')
      .send({
        name: 'Category supertest name',
        description: 'Category supertest description',
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.status).toBe(400);
  });
});
