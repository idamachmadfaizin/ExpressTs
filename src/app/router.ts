/**
 * Register all router in hire
 * @author Idam Achmad Faizin
 * @date 2020-11-21 22:01:48
 */

import { Application, Router } from 'express';
import { environment } from './../config/environment';
import { StringHelper } from './helpers/string.helper';
import authRouter from './routes/auth.route';
import indexRouter from './routes/index.route';
import roleRouter from './routes/role.route';

/**
 * Register your routes in HERE
 */
const registerRoutes: [string, Router][] = [
  ['/', indexRouter],
  ['/auth', authRouter],
  ['/role', roleRouter],
];

/**
 * Register all router to application
 * @param app Application
 */
export function routers(app: Application) {
  registerRoutes.forEach((each) => {
    const [url, router] = each;
    app.use(StringHelper.urlPrefix(url), router);
  });
}
