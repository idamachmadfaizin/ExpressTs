import { UserController } from '../http/controllers/user.controller';
import { RoleValidator } from '../http/middleware/validators/role.validator';
import { CRouter } from '../models/classes/router.class';

export class UserRouter extends CRouter {
  base: string = '/users';

  constructor() {
    super();

    this.router.get(`/`, UserController.get);
    this.router.get(`/:id`, UserController.find);
    this.router.put(`/change/:id`, RoleValidator.insertUpdate, UserController.update);
    this.router.delete(`/destroy/:id`, UserController.delete);
  }
}
