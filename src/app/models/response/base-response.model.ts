import { IResponse } from './response.interface';

export class BaseResponse<T> implements IResponse<T> {

  public data: T;
  public message: string;
  constructor(data: T, message: string) {
    this.data = data;
    this.message = message;
  }
}
