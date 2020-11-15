import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ObjectSchema, ValidationOptions } from 'joi';

export function validateRequestHelper(
  req: Request, res: Response, next: NextFunction, schema: ObjectSchema,
) {
  const options: ValidationOptions = {
    abortEarly: false, // include all errors
    allowUnknown: true, // ignore unknown props
    stripUnknown: true, // remove unknown props
  };
  const validateResult = schema.validate(req.body, options);

  if (validateResult.error) {
    res.status(StatusCodes.BAD_REQUEST).json(validateResult.error.details);
  } else {
    req.body = validateResult.value;
    next();
  }
}
