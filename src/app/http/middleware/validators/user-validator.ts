import { NextFunction, Request, Response } from 'express';
import Joi, { ValidationOptions } from 'joi';
import { getRoleEnum, roleEnum } from '../../../enumeration/role.enum';
import { validateRequestHelper } from '../../../helpers/validate-request-helper';

export function userCreateValidator(req: Request, res: Response, next: NextFunction) {
  const schema = Joi.object(
    {
      confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
      email: Joi.string().email().required(),
      name: Joi.string().required().min(5).max(128),
      password: Joi.string().min(8).required(),
    },
  );

  validateRequestHelper(req, res, next, schema);
}

export function userUpdateValidator(req: Request, res: Response, next: NextFunction) {
  const schema = Joi.object(
    {
      _id: Joi.string().required(),
      confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
      email: Joi.string().email().required(),
      name: Joi.string().required().min(5).max(128),
      password: Joi.string().min(8).required(),
    },
  );

  validateRequestHelper(req, res, next, schema);
}
