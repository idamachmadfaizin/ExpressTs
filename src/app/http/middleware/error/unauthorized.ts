/**
 * Unauthorize error handler class
 * @author Idam Achmad Faizin
 * @date 2020-11-21 21:49:04
 */

import { GeneralError } from './general-error';

export class Unauthorized extends GeneralError {
  constructor(message?: string) {
    super();
    this.message = message ?? 'Unauthorized';
  }
}
