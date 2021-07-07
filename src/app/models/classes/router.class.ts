import { Router } from 'express';

export abstract class CRouter {
  abstract base: string;
  exclude = false;
  router = Router();
}
