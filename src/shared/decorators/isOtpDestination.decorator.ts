import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { isEmail, isPhoneNumber } from '../constants/validate.constant';
import { ERROR_MESSAGES } from '../constants/baseError.constant';

@ValidatorConstraint({ name: 'IsOtpDestination', async: true })
export class IsOtpDestination implements ValidatorConstraintInterface {
  async validate(value: string) {
    if (!value || !isEmail(value) || !isPhoneNumber(value)) return false;
    return true;
  }

  defaultMessage() {
    return ERROR_MESSAGES.Otp.OTP_DESTINATION_INVALID;
  }
}
