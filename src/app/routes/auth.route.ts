import { Router } from 'express';
import { AuthController } from '../http/controllers/auth.controller';
import { loginValidator, registerValidator } from '../http/middleware/validators/auth.validator';

const authRouter = Router();

authRouter.post(`/register`, registerValidator, AuthController.register);
authRouter.post(`/login`, loginValidator, AuthController.login);
authRouter.post(`/refresh`, AuthController.refresh);
authRouter.post(`/revoke`, AuthController.revoke);

export default authRouter;
