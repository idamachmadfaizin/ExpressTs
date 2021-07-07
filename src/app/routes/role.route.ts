import { RoleController } from '../http/controllers/role.controller';
import { RoleValidator } from '../http/middleware/validators/role.validator';
import { CRouter } from '../models/classes/router.class';

export class RoleRouter extends CRouter {
  base: string = '/role';
  constructor() {
    super();

    this.router.get(`/`, RoleController.get);
    this.router.get(`/:id`, RoleController.find);
    this.router.post(`/add`, RoleValidator.insertUpdate, RoleController.insert);
    this.router.put(`/change/:id`, RoleValidator.insertUpdate, RoleController.update);
    this.router.delete(`/destroy/:id`, RoleController.delete);
  }
}
