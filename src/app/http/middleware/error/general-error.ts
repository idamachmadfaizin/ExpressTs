/**
 * General Error class
 * @author Idam Achmad Faizin
 * @date 2020-11-21 21:48:10
 */

export class GeneralError extends Error {
  constructor(message?: string) {
    super(message);
    this.message = message || '';
  }
}
