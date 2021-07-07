import { Router } from 'express';
import { serve, setup } from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';

const swaggerOptions: swaggerJSDoc.Options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Node.js + MongoDB API - JWT Authentication with Refresh Tokens',
      version: '1.0.0',
      description: 'A sample API',
    },
    host: 'localhost:3000',
    basePath: '/',
    // servers: [
    //   {
    //     url: 'http://localhost:3000',
    //   }
    // ],
  },
  apis: [
    './auth.yaml',
  ],
};
const swaggerSpec = swaggerJSDoc(swaggerOptions);

const swaggerRouter = Router();

swaggerRouter.use(`/`, serve, setup(swaggerSpec));

export default swaggerRouter;
