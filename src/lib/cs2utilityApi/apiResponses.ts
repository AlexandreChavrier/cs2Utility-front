export enum ROLE {
  ROLE_SUPER_ADMIN = 'ROLE_SUPER_ADMIN',
  ROLE_ADMIN = 'ROLE_ADMIN',
  ROLE_USER = 'ROLE_USER',
  ROLE_ANONYMOUS = 'ROLE_ANONYMOUS',
}

export type UserResponse = {
  uuid: string;
  email: string;
  firstName: string,
  lastName: string;
  fullName: string;
  role: ROLE;
  createdAt: string;
  updatedAt: string;
  lastLoginAt: string;
}