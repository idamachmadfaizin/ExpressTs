/**
 * Authentication router
 * @author Idam Achmad Faizin
 * @date 2020-11-21 22:01:00
 */

import { Router } from 'express';
import { AuthController } from '../http/controllers/auth.controller';
import { roles } from '../http/middleware/auth.middleware';
import { AuthValidator } from '../http/middleware/validators';

const authRouter = Router();

authRouter.post(`/register`, AuthValidator.register, AuthController.register);
authRouter.post(`/login`, AuthValidator.login, AuthController.login);
authRouter.post(`/refresh`, AuthController.refresh);
authRouter.post(`/revoke`, AuthController.revoke);
authRouter.post(
  `/assignRoles`,
  roles('admin'),
  AuthValidator.assignRole,
  AuthController.assignRoles,
);

export default authRouter;
