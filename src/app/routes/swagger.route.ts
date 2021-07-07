import { Router } from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import { serve, setup } from 'swagger-ui-express';
import { CRouter } from '../models/classes/router.class';

export class SwaggerRouter extends CRouter {
  base: string = '/docs';
  exclude = true;

  constructor() {
    super();
    const swaggerSpec = swaggerJSDoc(this.swaggerOptions());

    this.router.use(`/`, serve, setup(swaggerSpec));
  }

  private swaggerOptions(): swaggerJSDoc.Options {
    return {
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
        this.path('auth.yaml'),
        'swagger.yaml',
      ],
    };
  }

  private path(pathFile: string): string {
    return `src/app/routes/${pathFile}`;
  }
}
