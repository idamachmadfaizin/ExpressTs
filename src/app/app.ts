/**
 * Application configurations
 * @author Idam Achmad Faizin
 * @date 2020-11-21 22:01:29
 */

import cookieParser from 'cookie-parser';
import express, { Application } from 'express';
import helmet from 'helmet';
import logger from 'morgan';
import path from 'path';
import { auth } from './http/middleware/auth.middleware';
import { errorHandler } from './http/middleware/error/error-handler';
import { routers } from './router';

const app: Application = express();

app.use(logger('dev'));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(auth());

/**
 * Call function to register routers
 */
routers(app);

/**
 * Error Handler
 */
app.use(errorHandler);

export default app;
