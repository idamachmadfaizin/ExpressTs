/**
 * Not found error handler class
 * @author Idam Achmad Faizin
 * @date 2020-11-21 21:48:28
 */

import { GeneralError } from './general-error';

export class NotFound extends GeneralError {
  constructor(message?: string) {
    super();
    this.message = message ?? 'Notfound';
  }
}
