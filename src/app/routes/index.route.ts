/**
 * Api Index router
 * @author Idam Achmad Faizin
 * @date 2020-11-21 22:01:14
 */

import { Request, Response, Router } from 'express';
import { CRouter } from '../models/classes/router.class';

export class IndexRouter extends CRouter {
  base: string = '/';
  exclude = true;

  constructor() {
    super();

    this.router.get(`/`, (req: Request, res: Response) =>
      res.send('Express + TypeScript Server is awesome!!!'),
    );
  }
}
