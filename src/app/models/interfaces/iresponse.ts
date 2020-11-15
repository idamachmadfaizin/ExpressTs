export interface IResponse<T> {
  data?: T;
  message: string;
  errors: Error;
}

export interface IResponseWithCode<T> {
  data?: T;
  httpStatusCode: number;
  message: string;
  errors: Error;
}
