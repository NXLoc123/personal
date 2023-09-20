import { HttpStatus, Injectable } from '@nestjs/common';
import { OtpsService } from '../../core/otps/otps.service';
import { MailsService } from '../../core/mails/mails.service';
import {
  getErrorResponse,
  getNoContentSuccessResponse,
} from '../../../shared/libs/getResponse';
import { ERROR_MESSAGES } from '../../../shared/constants/baseError.constant';
import { UsersService } from '../../core/users/users.service';
import {
  ISendOtpByMailBody,
  ISendOtpBySmsBody,
} from '../../core/otps/interfaces/otp.interface';
import { ICheckExistProfileDetail } from '../../core/users/interface/user.interface';
import { ESmsService } from '../../core/esms/esms.service';
import { IErrorResponse } from '../../../shared/interface/basic.interface';

@Injectable()
export class ClientOtpsService {
  constructor(
    private readonly otpsService: OtpsService,
    private readonly mailsService: MailsService,
    private readonly usersService: UsersService,
    private readonly eSmsService: ESmsService,
  ) {}
  private async checkValidProfileRegister(
    body: ICheckExistProfileDetail,
  ): Promise<IErrorResponse | void> {
    const isExist =
      await this.usersService.checkTheExistenceProfileRegister(body);
    if (isExist)
      return getErrorResponse(
        HttpStatus.BAD_REQUEST,
        ERROR_MESSAGES.Auth.USER_INVALID,
      );
    return;
  }

  async sendOtpByMail(body: ISendOtpByMailBody) {
    const checkBody: ICheckExistProfileDetail = {
      email: body.email,
      phoneNumber: body.phoneNumber,
    };
    const isValidProfile = await this.checkValidProfileRegister(checkBody);
    if (!!isValidProfile) return isValidProfile;

    const { otpCode } = await this.otpsService.createNewOtp(body);
    const result = await this.mailsService.sendMail(body.email, otpCode);
    if (!result)
      return getErrorResponse(
        HttpStatus.BAD_REQUEST,
        ERROR_MESSAGES.Otp.SEND_OTP_FAILED,
      );
    return getNoContentSuccessResponse();
  }

  async sendOtpBySms(body: ISendOtpBySmsBody) {
    const checkBody: ICheckExistProfileDetail = {
      email: body.email,
      phoneNumber: body.phoneNumber,
    };
    const isValidProfile = await this.checkValidProfileRegister(checkBody);
    if (!!isValidProfile) return isValidProfile;
    const { otpCode } = await this.otpsService.createNewOtp(body);
    const result = await this.eSmsService.sendOtpSms(otpCode, body.phoneNumber);
    if (!result)
      return getErrorResponse(
        HttpStatus.BAD_REQUEST,
        ERROR_MESSAGES.Otp.SEND_OTP_FAILED,
      );
    return getNoContentSuccessResponse();
  }
}
