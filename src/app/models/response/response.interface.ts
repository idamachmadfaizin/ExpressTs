/**
 * Response interface
 * @author Idam Achmad Faizin
 * @date 2020-11-21 21:59:23
 */

/**
 * Standard interface response
 */
export interface IResponse<T> {
  data?: T;
  message: string;
}

/**
 * Standard interface response with errors
 */
export interface IResponseError<T> {
  data?: T;
  message: string;
  errors: Error | undefined | null;
}

/**
 * Standard interface response with error and status code
 */
export interface IResponseWithCode<T> {
  data?: T;
  httpStatusCode: number;
  message: string;
  errors: Error | undefined | null;
}
