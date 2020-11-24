import { Router } from 'express';
import { RoleController } from '../http/controllers/role.controller';
import { RoleValidator } from '../http/middleware/validators/role.validator';

const roleRouter = Router();

roleRouter.get(`/`, RoleController.get);
roleRouter.get(`/:id`, RoleController.find);
roleRouter.post(`/add`, RoleValidator.insertUpdate, RoleController.insert);
roleRouter.put(`/change/:id`, RoleValidator.insertUpdate, RoleController.update);
roleRouter.delete(`/destroy/:id`, RoleController.delete);

export default roleRouter;
