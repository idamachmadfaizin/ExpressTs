/**
 * Error Handler
 * @author Idam Achmad Faizin
 * @date 2020-11-21 21:45:29
 */

import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { BaseResponse } from '../../../models/response/base-response.model';
import { BadRequest } from './bad-request';
import { GeneralError } from './general-error';
import { NotFound } from './notfound';
import { Unauthorized } from './unauthorized';

/**
 * Error response handler
 * @param err Error
 * @param req Request
 * @param res Response
 * @param next NextFunction
 * @return BaseResponse
 */
export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  if (err instanceof GeneralError) {
    return res.status(getCode(err)).json(new BaseResponse(null, `Error: ${err.message}`));
  }
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json(new BaseResponse(null, `Error: ${err.message}`));
}

/**
 * Get Error code instanceof error
 * @param err Error
 * @return Http status code
 */
function getCode(err: Error): number {
  switch (true) {
    case err instanceof BadRequest:
      return StatusCodes.BAD_REQUEST;
    case err instanceof NotFound:
      return StatusCodes.NOT_FOUND;
    case err instanceof Unauthorized:
      return StatusCodes.UNAUTHORIZED;
    default:
      return StatusCodes.INTERNAL_SERVER_ERROR;
  }
}
