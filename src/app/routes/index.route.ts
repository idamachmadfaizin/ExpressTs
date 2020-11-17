import { Request, Response, Router } from 'express';

const indexRouter = Router();

indexRouter.get(`/`, (req: Request, res: Response) =>
  res.send('Express + TypeScript Server is awesome!!!'),
);

export default indexRouter;
