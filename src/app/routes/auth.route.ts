/**
 * Authentication router
 * @author Idam Achmad Faizin
 * @date 2020-11-21 22:01:00
 */

import { Router } from 'express';
import { AuthController } from '../http/controllers/auth.controller';
import { loginValidator, registerValidator } from '../http/middleware/validators/auth.validator';

const authRouter = Router();

authRouter.post(`/register`, registerValidator, AuthController.register);
authRouter.post(`/login`, loginValidator, AuthController.login);
authRouter.post(`/refresh`, AuthController.refresh);
authRouter.post(`/revoke`, AuthController.revoke);

export default authRouter;
