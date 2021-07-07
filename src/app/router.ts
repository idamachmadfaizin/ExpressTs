/**
 * Register all router in hire
 * @author Idam Achmad Faizin
 * @date 2020-11-21 22:01:48
 */
import { Application } from 'express';

import { StringHelper } from './helpers/string.helper';
import { CRouter } from './models/classes/router.class';
import { AuthRouter } from './routes/auth.route';
import { IndexRouter } from './routes/index.route';
import { RoleRouter } from './routes/role.route';
import { SwaggerRouter } from './routes/swagger.route';
import { UserRouter } from './routes/user.route';

/**
 * Register your routes in HERE
 */
const registerRoutes: CRouter[] = [
  new IndexRouter(),
  new AuthRouter(),
  new RoleRouter(),
  new UserRouter(),
  new SwaggerRouter(),
];

/**
 * Register all router to application
 * @param app Application
 */
export function routers(app: Application) {
  registerRoutes.forEach(({ base, router, exclude }) =>
    app.use(exclude ? base : StringHelper.urlPrefix(base), router));
}
