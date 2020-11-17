import { Application, Request, Response } from 'express';
import authRouter from './routes/auth.route';

export function router(app: Application) {
  const ver = '1.0';
  const prefix = `/api/${ver}`;

  app.get(`${prefix}/`, (req: Request, res: Response) =>
    res.send('Express + TypeScript2 Server is awesome!!!'),
  );
  app.get(`/ping`, (req: Request, res: Response) =>
    res.status(200).send({ data: 'Pong!' }),
  );
  app.use(`${prefix}/auth`, authRouter);
}
