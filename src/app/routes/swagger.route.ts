import { Router } from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import { serve, setup } from 'swagger-ui-express';

function path(pathFile: string): string {
  return `src/app/routes/${pathFile}`;
}

const swaggerOptions: swaggerJSDoc.Options = {
  swaggerDefinition: {
    openapi: '3.0.2',
    info: {
      title: 'Node.js + MongoDB API - JWT Authentication with Refresh Tokens',
      version: '1.0',
      description: 'A sample API',
    },
    servers: [
      {
        url: '/api/1.0',
      },
    ],
  },
  apis: [
    path('auth.yaml'),
    'swagger.yaml',
  ],
};
const swaggerSpec = swaggerJSDoc(swaggerOptions);

const swaggerRouter = Router();

swaggerRouter.use(`/`, serve, setup(swaggerSpec));

export default swaggerRouter;
