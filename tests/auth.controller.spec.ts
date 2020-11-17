import { ILogin } from './../src/app/models/interfaces/login.interface';

import request from 'supertest';
import { app } from '../src/app/app';
const prefix = '/api/1.0';

describe('Test PingController', () => {
  it('Request /ping should return Pong!', async () => {
    const result = await request(app).get('/ping').send();

    expect(result.status).toBe(200);
    expect(result.body.data).toBe('Pong!');
  });
});

// describe('Test Auth endpoints', () => {
//   const authUrl = `${prefix}/auth`;
//   describe('Login', () => {
//     const loginUrl = `${authUrl}/login`;
//     it('Success Login isremember', async () => {
//       const loginData: ILogin = {
//         email: 'first@mail.com',
//         password: 'password',
//         isRemember: false,
//       };
//       const result = await request(app).post(loginUrl).send(loginData);
//       expect(result.status).toBe(200);
//     }, 10000);
//   });
// });
