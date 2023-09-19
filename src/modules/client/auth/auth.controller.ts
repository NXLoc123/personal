import { Body, Controller, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { ClientAuthService } from './auth.service';
import { LoginGuard } from '../../core/auth/guards/login.guard';
import { User } from '../../../shared/decorators/user.decorator';
import { IUser } from '../../core/users/interface/user.interface';
import { LoginDto, RegisterDto } from '../../core/auth/dto/auth.dto';
import {
  UserRoleTypes,
  UserStatusTypes,
} from '../../core/users/enum/user.enum';
import {
  getErrorResponse,
  getInternalServerErrorResponse,
} from '../../../shared/libs/getResponse';
import { ERROR_MESSAGES } from '../../../shared/constants/baseError.constant';
import { OtpDestinationTypes } from '../../core/otps/enums/otp.enum';

@ApiTags('Auth')
@Controller('auth')
export class ClientAuthController {
  constructor(private readonly clientAuthService: ClientAuthService) {}

  @UseGuards(LoginGuard)
  @ApiBody({ type: LoginDto })
  @Post('login')
  async login(@User() user: IUser) {
    try {
      return !user ? user : await this.clientAuthService.loginForUser(user.id);
    } catch (error) {
      console.log(
        '🚀 ~ file: auth.controller.ts:31 ~ ClientAuthController ~ login ~ error:',
        error,
      );
      return getInternalServerErrorResponse();
    }
  }

  @Post('register')
  async register(@Body() { otpCode, ...body }: RegisterDto) {
    try {
      let isValidOtpCode: boolean = true;
      switch (body.otpDestinationType) {
        case OtpDestinationTypes.Email:
          isValidOtpCode = await this.clientAuthService.verifyOtpCodeByMail(
            otpCode,
            body.email,
            body.otpDestinationType,
          );
          break;
        case OtpDestinationTypes.Phone:
          break;
      }
      if (!isValidOtpCode)
        return getErrorResponse(
          HttpStatus.BAD_REQUEST,
          ERROR_MESSAGES.Otp.OTP_CODE_INVALID,
        );
      const createUserDto = {
        ...body,
        role: UserRoleTypes.User,
        status: UserStatusTypes.Verified,
      };
      return await this.clientAuthService.registerForUser(createUserDto);
    } catch (error) {
      console.log(
        '🚀 ~ file: auth.controller.ts:46 ~ ClientAuthController ~ register ~ error:',
        error,
      );
      return getInternalServerErrorResponse();
    }
  }
}
