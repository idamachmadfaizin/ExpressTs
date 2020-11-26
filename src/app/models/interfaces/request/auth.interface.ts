/**
 * Interface authentication request
 * @author Idam Achmad Faizin
 * @date 2020-11-21 21:57:26
 */

/**
 * Interface login request
 */
export interface ILogin {
  email: string;
  password: string;
  isRemember: boolean;
}

/**
 * Interface register request
 */
export interface IRegister {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

/**
 * Interface assign roles to a user
 */
export interface IAssignRole {
  userId: string;
  roles: string[];
}
