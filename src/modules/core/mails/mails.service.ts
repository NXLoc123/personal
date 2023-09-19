import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ISendOtpByMailBody } from '../otps/interfaces/otp.interface';

@Injectable()
export class MailsService {
  constructor(private mailerService: MailerService) {}
  private VERIFY_ACCOUNT_MAIL_SUBJECT = 'OTP Verification';
  private getMailText(otp: string) {
    return `OTP: ${otp} is used to verify your account`;
  }

  async sendMail(body: ISendOtpByMailBody, otp: string) {
    try {
      await this.mailerService.sendMail({
        to: body.email,
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
