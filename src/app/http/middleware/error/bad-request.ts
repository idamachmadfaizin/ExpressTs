/**
 * bad request error handler class
 * @author Idam Achmad Faizin
 * @date 2020-11-21 21:45:08
 */

import { GeneralError } from './general-error';

export class BadRequest extends GeneralError {
  constructor(message?: string) {
    super();
    this.message = message ?? 'Bad Request';
  }
}
