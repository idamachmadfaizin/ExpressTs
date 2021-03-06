/**
 * Authentication request validator
 * @author Idam Achmad Faizin
 * @date 2020-11-21 21:49:37
 */

import bcrypt from 'bcrypt';
import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import { validateRequestHelper } from '../../../helpers/validate-request.helper';

export class AuthValidator {
  /**
   * Login request validator
   * @param req Request
   * @param res Response
   * @param next NextFunction
   * @schema {email, password, isRemember}
   */
  static login(req: Request, res: Response, next: NextFunction) {
    const schema = Joi.object({
      email: Joi.string().required(),
      password: Joi.string().required(),
      isRemember: Joi.boolean().required().default(false),
    });

    validateRequestHelper(req, res, next, schema);
  }

  /**
   * Register request validator
   * @param req Request
   * @param res Response
   * @param next NextFunction
   * @schema {confirmPassword, email, name, password}
   */
  static register(req: Request, res: Response, next: NextFunction) {
    const schema = Joi.object({
      confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
      email: Joi.string().email().required(),
      name: Joi.string().required().min(5).max(128),
      password: Joi.string().min(8).required(),
    });

    validateRequestHelper(req, res, next, schema);

    /** Hashing password */
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);
    req.body.password = hashedPassword;
  }

  /**
   * Assign roles to a user validator
   * @param req Request
   * @param res Response
   * @param next NextFunction
   * @schema {userId: string, roles: string[]}
   */
  public static assignRole(req: Request, res: Response, next: NextFunction) {
    const schema = Joi.object({
      userId: Joi.string().required(),
      roles: Joi.array().items(Joi.string()).required().min(1).unique(),
    });

    validateRequestHelper(req, res, next, schema);
  }
}
