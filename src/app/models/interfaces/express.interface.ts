/**
 * @author Idam Achmad Faizin
 * @date 2020-12-06 22:59:59
 */

import { IPayload } from './payload.interface';
import { Request } from 'express';

export interface IRequest extends Request {
  user?: IPayload;
}
