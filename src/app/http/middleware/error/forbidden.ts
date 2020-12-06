import { GeneralError } from './general-error';

export class Forbidden extends GeneralError {
  constructor(message?: string) {
    super();
    this.message = message ?? 'Forbidden';
  }
}
