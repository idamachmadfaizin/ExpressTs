import bcrypt from 'bcrypt';
import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import { validateRequestHelper } from '../../../helpers/validate-request-helper';

export function loginValidator(req: Request, res: Response, next: NextFunction) {
  const schema = Joi.object(
    {
      email: Joi.string().required(),
      password: Joi.string().required(),
    },
  );

  validateRequestHelper(req, res, next, schema);
}

export function registerValidator(req: Request, res: Response, next: NextFunction) {
  const schema = Joi.object(
    {
      confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
      email: Joi.string().email().required(),
      name: Joi.string().required().min(5).max(128),
      password: Joi.string().min(8).required(),
    },
  );

  validateRequestHelper(req, res, next, schema);

  /** Hashing password */
  const hashedPassword = bcrypt.hashSync(req.body.password, 10);
  req.body.password = hashedPassword;
}
