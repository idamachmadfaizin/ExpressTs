/**
 * Authentication router
 * @author Idam Achmad Faizin
 * @date 2020-11-21 22:01:00
 */

import { Router } from 'express';
import { AuthController } from '../http/controllers/auth.controller';
import { roles } from '../http/middleware/auth.middleware';
import { AuthValidator } from '../http/middleware/validators';
import { CRouter } from '../models/classes/router.class';

export class AuthRouter extends CRouter {
  base = '/auth';

  constructor() {
    super();

    this.router.post(`/register`, AuthValidator.register, AuthController.register);
    this.router.post(`/login`, AuthValidator.login, AuthController.login);
    this.router.post(`/refresh`, AuthController.refresh);
    this.router.post(`/revoke`, AuthController.revoke);
    this.router.post(
      `/assignRoles`,
      roles('admin'),
      AuthValidator.assignRole,
      AuthController.assignRoles,
    );
  }
}
