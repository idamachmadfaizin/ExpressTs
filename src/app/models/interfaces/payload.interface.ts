/**
 * @author Idam Achmad Faizin
 * @date 2020-12-06 04:20:13
 */

export interface IPayload {
  id: string;
  email: string;
  roles: string[];
  iat?: number;
  exp?: number;
}
