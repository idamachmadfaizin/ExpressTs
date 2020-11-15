export interface IResponse<T> {
  data?: T;
  message: string;
}

export interface IResponseError<T> {
  data?: T;
  message: string;
  errors: Error | undefined | null;
}

export interface IResponseWithCode<T> {
  data?: T;
  httpStatusCode: number;
  message: string;
  errors: Error | undefined | null;
}
