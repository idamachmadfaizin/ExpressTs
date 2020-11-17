import { Application, Router } from 'express';
import { environment } from './../config/environment';
import authRouter from './routes/auth.route';
import indexRouter from './routes/index.route';

/**
 * Register your routes in HERE
 */
const registerRoutes: [string, Router][] = [
  ['/', indexRouter],
  ['/auth', authRouter],
];

/**
 * Register all router to application
 * @param app Application
 */
export function routers(app: Application) {
  const prefix = `/api/${environment.APP_VERSION}`;

  registerRoutes.forEach((each) => {
    const [url, router] = each;
    app.use(prefix + url, router);
  });
}
