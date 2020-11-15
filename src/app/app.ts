import express from 'express';
import { errorHandler } from './http/middleware/error/error-handler';
import { router } from './router';
import logger from 'morgan';
import path from 'path';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';

const app = express();

app.use(logger('dev'));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

router(app);

/**
 * Error Handler
 */
app.use(errorHandler);

export default app;
