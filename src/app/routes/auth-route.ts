import { Router } from 'express';
import { loginValidator, registerValidator } from '../http/middleware/validators/auth-validator';
import { AuthController } from './../http/controllers/auth-controller';

const authRouter = Router();

authRouter.post(`/register`, registerValidator, AuthController.register);
authRouter.post(`/login`, loginValidator, AuthController.login);
authRouter.post(`/refresh`, AuthController.refresh);

export default authRouter;
// export function authRoute() { return router; }
