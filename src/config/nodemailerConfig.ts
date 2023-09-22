import { MailerOptions } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';

export const nodeMailerConfig = (
  configService: ConfigService,
): MailerOptions => ({
  transport: {
    service: 'gmail',
    auth: {
      user: configService.get('nodeMailer.user'),
      pass: configService.get('nodeMailer.password'),
    },
  },
});
