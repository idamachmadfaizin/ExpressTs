import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import { validateRequestHelper } from '../../../helpers/validate-request.helper';

export class RoleValidator {
  /**
   * Validate for insert and update
   */
  public static insertUpdate(req: Request, res: Response, next: NextFunction) {
    const schema = Joi.object({
      name: Joi.string().required().lowercase(),
    });

    validateRequestHelper(req, res, next, schema);
  }
}
