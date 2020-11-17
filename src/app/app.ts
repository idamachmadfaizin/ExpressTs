import cookieParser from 'cookie-parser';
import express, { Application } from 'express';
import helmet from 'helmet';
import logger from 'morgan';
import path from 'path';
import { errorHandler } from './http/middleware/error/error-handler';
import { routers } from './router';

const app: Application = express();

app.use(logger('dev'));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/**
 * Call function to register routers
 */
routers(app);

/**
 * Error Handler
 */
app.use(errorHandler);

export default app;
