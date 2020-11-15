import { Request, Response } from 'express';
import * as core from 'express-serve-static-core';
import authRouter from './routes/auth-route';

export function router(app: core.Express) {
  const ver = '1.0';
  const prefix = `/api/${ver}`;

  app.get(`${prefix}/`, (req: Request, res: Response) =>
    res.send('Express + TypeScript2 Server is awesome!!!'),
  );
  app.use(`${prefix}/auth`, authRouter);
}
