import { HttpStatus, Injectable } from '@nestjs/common';
import { AuthService } from '../../core/auth/auth.service';
import { IPayload, IRegister } from '../../core/auth/interfaces/auth.interface';
import {
  getErrorResponse,
  getNoContentSuccessResponse,
} from '../../../shared/libs/getResponse';
import { AUTH_ERROR_MESSAGE } from '../../../shared/constants/baseError.constant';

@Injectable()
export class ClientAuthService {
  constructor(private readonly authService: AuthService) {}

  async loginForUser(userId: string) {
    const payload: IPayload = {
      id: userId,
      sub: userId,
    };
    const accessToken = await this.authService.signToken(payload);

    return { accessToken };
  }

  async registerForUser(body: IRegister) {
    const isValidUser = await this.authService.checkUserExist(
      body.email,
      body.phoneNumber,
    );

    if (isValidUser)
      return getErrorResponse(
        HttpStatus.BAD_REQUEST,
        AUTH_ERROR_MESSAGE.USER_INVALID,
      );
    await this.authService.createNewUser(body);
    return getNoContentSuccessResponse();
  }
}
