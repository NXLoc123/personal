import { ICreateUser } from '../../users/interface/user.interface';

export interface ILogin {
  email: string;
  password: string;
}

export type IRegister = ICreateUser;

export interface IPayload {
  id: string;
  sub: string;
}
