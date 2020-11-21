/**
 * Api Index router
 * @author Idam Achmad Faizin
 * @date 2020-11-21 22:01:14
 */

import { Request, Response, Router } from 'express';

const indexRouter = Router();

indexRouter.get(`/`, (req: Request, res: Response) =>
  res.send('Express + TypeScript Server is awesome!!!'),
);

export default indexRouter;
