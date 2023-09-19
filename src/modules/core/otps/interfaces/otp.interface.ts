import { IBaseEntity } from '../../../../shared/interface/basic.interface';
import {
  OtpDestinationTypes,
  OtpStatusTypes,
  OtpTypes,
} from '../enums/otp.enum';

export interface IOtp extends IBaseEntity {
  otpCode: string;
  otpType: IOtpType;
  expiredAt: Date;
  otpStatus: IOtpStatusType;
  otpDestination: string | null;
  otpDestinationType: IOtpDestinationType;
}

export type IOtpDestinationType = `${OtpDestinationTypes}`;
export type IOtpType = `${OtpTypes}`;
export type IOtpStatusType = `${OtpStatusTypes}`;

export type ICreateOtp = Pick<
  IOtp,
  | 'otpCode'
  | 'expiredAt'
  | 'otpType'
  | 'otpStatus'
  | 'otpDestination'
  | 'otpDestinationType'
>;
export interface ISendOtpByMailBody {
  email: string;
  phoneNumber: string;
  otpType: IOtpType;
  otpDestinationType: IOtpDestinationType;
}
