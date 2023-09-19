import { IBaseEntity } from '../../../../shared/interface/basic.interface';
import { UserRoleTypes, UserStatusTypes } from '../enum/user.enum';

export interface IUser extends IBaseEntity {
  firstName: string;
  lastName: string;
  role: IUserRoles;
  status: IUserStatuses;
  email: string;
  phoneNumber: string;
  password: string;
}

export type IUserRoles = `${UserRoleTypes}`;
export type IUserStatuses = `${UserStatusTypes}`;

export type ICreateUser = Omit<IUser, keyof IBaseEntity | 'role'>;
export type IUpdateUser = Partial<ICreateUser>;
export type IUpdateUserRole = Pick<IUser, 'role'>;

export type ICheckExistProfileDetail = Pick<IUser, 'email' | 'phoneNumber'>;

export type IUserFilter = Partial<Pick<IUser, 'role' | 'status'>>;
