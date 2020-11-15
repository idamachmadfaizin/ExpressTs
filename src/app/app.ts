import express from 'express';
import { errorHandler } from './http/middleware/error/error-handler';
import { router } from './router';

const app = express();

app.use(express.json());

router(app);

/**
 * Error Handler
 */
app.use(errorHandler);

export default app;
