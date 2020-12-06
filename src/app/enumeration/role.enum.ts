/**
 * @author Idam Achmad Faizin
 * @date 2020-12-06 23:00:20
 */

export enum RoleEnum {
  admin = 'admin',
  guest = 'guest',
}

export function getRoleEnum() {
  return Object.values(RoleEnum);
}
