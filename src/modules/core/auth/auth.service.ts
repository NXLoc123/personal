import { JwtService } from '@nestjs/jwt';
import { ILogin, IPayload } from './interfaces/auth.interface';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { ICreateUser } from '../users/interface/user.interface';
import { OtpsService } from '../otps/otps.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly usersService: UsersService,
    private readonly otpsService: OtpsService,
  ) {}

  private async genSalt() {
    try {
      return await bcrypt.genSalt();
    } catch (error) {
      throw error;
    }
  }

  private async hashPassword(password: string) {
    try {
      const salt = await this.genSalt();
      return await bcrypt.hash(password, salt);
    } catch (error) {
      throw error;
    }
  }

  private async comparePassword(password: string, hashPassword: string) {
    try {
      return await bcrypt.compare(password, hashPassword);
    } catch (error) {
      throw error;
    }
  }

  async signToken(payload: IPayload) {
    try {
      return await this.jwtService.signAsync(payload);
    } catch (error) {
      console.log(
        '🚀 ~ file: auth.service.ts:44 ~ AuthService ~ signToken ~ error:',
        error,
      );
      throw error;
    }
  }

  async checkUserExist(email: string, phoneNumber: string) {
    try {
      const user = await this.usersService.findOneUserByQuery([
        { email },
        { phoneNumber },
      ]);
      return !!user;
    } catch (error) {
      throw error;
    }
  }

  async validateUser({ email, password }: ILogin) {
    const user = await this.usersService.findOneUserByQuery({
      email: email,
    });
    if (!user) return user;
    const { password: hashPassword, ...rest } = user;
    const isValidPassword = await this.comparePassword(password, hashPassword);
    if (!isValidPassword) return null;
    return rest;
  }

  async createNewUser(body: ICreateUser) {
    const hashPassword = await this.hashPassword(body.password);
    body.password = hashPassword;
    const result = await this.usersService.createNewUser(body);
    return result;
  }

  async checkOtpCode(code: string) {
    console.log('code', code);
  }
}
