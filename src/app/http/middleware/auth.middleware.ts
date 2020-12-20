/**
 * @author Idam Achmad Faizin
 * @date 2020-12-06 21:55:34
 */

import { NextFunction, Response } from 'express';
import jwt from 'express-jwt';
import { StringHelper } from '../../helpers/string.helper';
import { environment } from './../../../config/environment';
import { IRequest } from './../../models/interfaces/express.interface';
import { Forbidden } from './error/forbidden';
import { Unauthorized } from './error/unauthorized';

export function auth() {
  const secret = environment.TOKEN_SECRET;
  const prefix = StringHelper.urlPrefix;

  return jwt({ secret, algorithms: ['HS256'] }).unless({
    path: [
      /^\/docs\/.*/, /** Swagger path exclude */
      prefix('/'),
      prefix('/auth/register'),
      prefix('/auth/login'),
    ],
  });
}

export function roles(hasRoles: string | string[] = []) {
  const newRoles: string[] =
    typeof hasRoles === 'string' ? [hasRoles] : hasRoles;

  return [
    async (req: IRequest, res: Response, next: NextFunction) => {
      const payload = req.user;
      if (!payload) next(new Unauthorized('Unauthorized'));

      if (newRoles.filter(x => payload?.roles.includes(x))?.length === 0)
        next(new Forbidden('Do not have permission'));

      next();
    },
  ];
}
