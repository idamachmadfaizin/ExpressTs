import { Router } from 'express';
import { serve, setup } from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';

const swaggerOptions: swaggerJSDoc.Options = {
  swaggerDefinition: {
    info: {
      title: 'Node.js + MongoDB API - JWT Authentication with Refresh Tokens',
      version: '1.0.0',
      // description: 'A sample API',
    },
    host: 'localhost:3000',
    basePath: '/',
  },
  apis: [
    './app/routes/**.yaml',
  ],
};
const swaggerSpec = swaggerJSDoc(swaggerOptions);

const swaggerRouter = Router();

swaggerRouter.use(`/`, serve, setup(swaggerSpec));

export default swaggerRouter;
