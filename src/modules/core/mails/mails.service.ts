import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { IUser } from '../users/interface/user.interface';

@Injectable()
export class MailsService {
  constructor(private mailerService: MailerService) {}
  private VERIFY_ACCOUNT_MAIL_SUBJECT = 'OTP Verification';
  private getMailText(otp: string) {
    return `Your OTP is: ${otp}`;
  }

  async sendMail({ email }: IUser, otp: string) {
    try {
      await this.mailerService.sendMail({
        to: email,
        subject: this.VERIFY_ACCOUNT_MAIL_SUBJECT,
        text: this.getMailText(otp),
      });
    } catch (error) {
      console.log(
        '🚀 ~ file: mails.service.ts:21 ~ MailsService ~ sendMail ~ error:',
        error,
      );
    }
  }
}
