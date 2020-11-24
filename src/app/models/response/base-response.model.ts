/**
 * Base response class
 * @author Idam Achmad Faizin
 * @date 2020-11-21 21:58:51
 */

import { IResponse } from './response.interface';

export class BaseResponse<T> implements IResponse<T> {

  public data: T;
  public message: string;
  constructor(data: T, message: string = 'success') {
    this.data = data;
    this.message = message;
  }
}
