import { IResponse } from '../interfaces/iresponse';

export class BaseResponseModel<T> implements IResponse<T> {

  public data: T;
  public errors: Error;
  public message: string;
  constructor(data: T, message: string, errors: Error = new Error()) {
    this.data = data;
    this.message = message;
    this.errors = errors;
  }
}
