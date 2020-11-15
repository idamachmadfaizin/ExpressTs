export enum roleEnum {
  Admin = 'admin',
  User = 'user',
}

export function getRoleEnum() {
  return Object.values(roleEnum);
}
