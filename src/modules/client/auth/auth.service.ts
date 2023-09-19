import { HttpStatus, Injectable } from '@nestjs/common';
import { AuthService } from '../../core/auth/auth.service';
import { IPayload, IRegister } from '../../core/auth/interfaces/auth.interface';
import {
  getErrorResponse,
  getNoContentSuccessResponse,
} from '../../../shared/libs/getResponse';
import { ERROR_MESSAGES } from '../../../shared/constants/baseError.constant';
import { IOtpDestinationType } from '../../core/otps/interfaces/otp.interface';
import { OtpsService } from '../../core/otps/otps.service';

@Injectable()
export class ClientAuthService {
  constructor(
    private readonly authService: AuthService,
    private readonly otpsService: OtpsService,
  ) {}

  async loginForUser(userId: string) {
    const payload: IPayload = {
      id: userId,
      sub: userId,
    };
    const accessToken = await this.authService.signToken(payload);

    return { accessToken };
  }

  async registerForUser(body: IRegister) {
    const isExistUser = await this.authService.checkUserExist(
      body.email,
      body.phoneNumber,
    );
    if (isExistUser)
      return getErrorResponse(
        HttpStatus.BAD_REQUEST,
        ERROR_MESSAGES.Auth.USER_INVALID,
      );

    await this.authService.createNewUser(body);
    return getNoContentSuccessResponse();
  }

  async verifyOtpCodeByMail(
    code: string,
    email: string,
    otpDestinationType: IOtpDestinationType,
  ) {
    return await this.otpsService.checkOtpCode(code, email, otpDestinationType);
  }
}
