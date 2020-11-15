import { Router } from 'express';
import { loginValidator, registerValidator } from '../http/middleware/validators/auth-validator';
import { AuthController } from './../http/controllers/auth-controller';

const authRouter = Router();

authRouter.post(`/login`, loginValidator, AuthController.login);
authRouter.post(`/register`, registerValidator, AuthController.register);

export default authRouter;
// export function authRoute() { return router; }
