import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { getContentRegisterOtp } from '../otps/constant/otps.constant';

@Injectable()
export class MailsService {
  constructor(private mailerService: MailerService) {}
  private VERIFY_ACCOUNT_MAIL_SUBJECT = 'OTP Verification';
  private getMailText(otp: string) {
    return getContentRegisterOtp(otp);
  }

  async sendMail(email: string, otp: string) {
    try {
      await this.mailerService.sendMail({
        to: email,
        subject: this.VERIFY_ACCOUNT_MAIL_SUBJECT,
        text: this.getMailText(otp),
      });
      return true;
    } catch (error) {
      console.log(
        '🚀 ~ file: mails.service.ts:21 ~ MailsService ~ sendMail ~ error:',
        error,
      );
      return false;
    }
  }
}
