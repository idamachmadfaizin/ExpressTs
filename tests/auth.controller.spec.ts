import request from 'supertest';
import app from '../src/app/app';
import { ILogin } from './../src/app/models/interfaces/login.interface';
import { basicConfig } from './basicConfig';

const prefix = '/api/1.0';
basicConfig();

describe('Test Auth endpoints', () => {
  const authUrl = `${prefix}/auth`;

  describe('POST /Login', () => {
    const loginUrl = `${authUrl}/login`;

    it('Success Login is remember', async () => {
      const loginData: ILogin = {
        email: 'first@mail.com',
        password: 'password',
        isRemember: false,
      };
      const result = await request(app).post(loginUrl).send(loginData);

      expect(result.status).toBe(200);
      expect(result.body.data.token).toBeTruthy();
    });
  });
});
