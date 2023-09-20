import { ConfigService } from '@nestjs/config';
import { getContentRegisterOtp } from '../otps/constant/otps.constant';
import { ISendSmsOtpRequestBody } from './interface/esms.interface';
import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class ESmsService {
  ESMS_HOST: string;
  ESMS_API_KEY: string;
  ESMS_SECRET_KEY: string;
  ESMS_SMS_TYPE: string;
  constructor(private configsService: ConfigService) {
    this.ESMS_HOST = this.configsService.get('eSms.host');
    this.ESMS_API_KEY = this.configsService.get('eSms.apikey');
    this.ESMS_SECRET_KEY = this.configsService.get('eSms.secretkey');
    this.ESMS_SMS_TYPE = '8';
  }

  private makeHeaders() {
    return {
      'Content-Type': 'application/json',
    };
  }

  private makeContentBodyESms(otpCode: string) {
    return getContentRegisterOtp(otpCode);
  }

  private makeBody(otpCode: string, phoneNumber: string) {
    const body: ISendSmsOtpRequestBody = {
      ApiKey: this.ESMS_API_KEY,
      Content: this.makeContentBodyESms(otpCode),
      Phone: phoneNumber,
      SecretKey: this.ESMS_SECRET_KEY,
      SmsType: this.ESMS_SMS_TYPE,
    };
    return body;
  }

  async sendOtpSms(otpCode: string, phoneNumber: string) {
    try {
      const body = this.makeBody(otpCode, phoneNumber);
      const headers = this.makeHeaders();
      const url = this.ESMS_HOST;
      await axios.post(url, body, { headers });

      return true;
    } catch (error) {
      console.log(
        '🚀 ~ file: esms.service.ts:48 ~ ESmsService ~ sendOtpSms ~ error:',
        error,
      );
      return false;
    }
  }
}
