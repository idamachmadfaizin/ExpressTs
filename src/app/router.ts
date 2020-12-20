/**
 * Register all router in hire
 * @author Idam Achmad Faizin
 * @date 2020-11-21 22:01:48
 */

import { Application, Router } from 'express';
import { StringHelper } from './helpers/string.helper';
import authRouter from './routes/auth.route';
import indexRouter from './routes/index.route';
import roleRouter from './routes/role.route';
import swaggerRouter from './routes/swagger.route';

/**
 * Register your routes in HERE
 * @param string url
 * @param Router Router
 * @param boolean exclude from url prefix
 */
const registerRoutes: [string, Router, boolean?][] = [
  ['/', indexRouter],
  ['/auth', authRouter],
  ['/role', roleRouter],
  ['/docs', swaggerRouter, true],
];

/**
 * Register all router to application
 * @param app Application
 */
export function routers(app: Application) {
  registerRoutes.forEach((each) => {
    const [url, router, exclude] = each;
    exclude
      ? app.use(url, router)
      : app.use(StringHelper.urlPrefix(url), router);
  });
}
