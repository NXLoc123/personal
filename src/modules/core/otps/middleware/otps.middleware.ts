import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { OtpsService } from '../otps.service';
import { OtpDestinationTypes } from '../enums/otp.enum';
import { ERROR_MESSAGES } from '../../../../shared/constants/baseError.constant';
import { MAXIMUM_NUMBER_OF_TIMES_REQUEST } from '../constant/otps.constant';

@Injectable()
export class OtpMiddleware implements NestMiddleware {
  constructor(private otpsService: OtpsService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const { otpDestinationType, phoneNumber, email } = req.body;
    let numberOfTimes: number;
    switch (otpDestinationType) {
      case OtpDestinationTypes.Email:
        numberOfTimes = await this.otpsService.getOtpRequestAttempts(email);
        break;
      case OtpDestinationTypes.Phone:
        numberOfTimes =
          await this.otpsService.getOtpRequestAttempts(phoneNumber);
        break;
      default:
        return res
          .status(HttpStatus.BAD_REQUEST)
          .send({ message: ERROR_MESSAGES.Common.BAD_REQUEST });
    }
    if (numberOfTimes > MAXIMUM_NUMBER_OF_TIMES_REQUEST)
      return res
        .status(HttpStatus.TOO_MANY_REQUESTS)
        .send({ message: ERROR_MESSAGES.Otp.OTP_REQUEST_INVALID });
    next();
  }
}
