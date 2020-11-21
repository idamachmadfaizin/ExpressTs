/**
 * User request validator
 * @author Idam Achmad Faizin
 * @date 2020-11-21 21:52:32
 */

import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import { validateRequestHelper } from '../../../helpers/validate-request.helper';

export class UserValidator {
  /**
   * Create user request validator
   * @param req Request
   * @param res Response
   * @param next NextFunction
   * @schema {confirmPassword, email, name, password}
   */
  static create(req: Request, res: Response, next: NextFunction) {
    const schema = Joi.object({
      confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
      email: Joi.string().email().required(),
      name: Joi.string().required().min(5).max(128),
      password: Joi.string().min(8).required(),
    });

    validateRequestHelper(req, res, next, schema);
  }

  /**
   * Update user request validator
   * @param req Request
   * @param res Response
   * @param next NextFunction
   * @schema {_id, confirmPassword, email, name, password}
   */
  static update(req: Request, res: Response, next: NextFunction) {
    const schema = Joi.object({
      _id: Joi.string().required(),
      confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
      email: Joi.string().email().required(),
      name: Joi.string().required().min(5).max(128),
      password: Joi.string().min(8).required(),
    });

    validateRequestHelper(req, res, next, schema);
  }
}
