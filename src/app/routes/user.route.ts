import { Router } from 'express';
import { UserController } from '../http/controllers/user.controller';
import { RoleValidator } from '../http/middleware/validators/role.validator';

const userRouter = Router();

userRouter.get(`/`, UserController.get);
userRouter.get(`/:id`, UserController.find);
userRouter.put(`/change/:id`, RoleValidator.insertUpdate, UserController.update);
userRouter.delete(`/destroy/:id`, UserController.delete);

export default userRouter;
