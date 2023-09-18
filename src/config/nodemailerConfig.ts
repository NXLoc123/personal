import { MailerOptions } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';

export const nodeMailerConfig = (
  configService: ConfigService,
): MailerOptions => ({
  transport: {
    // host: configService.get('nodeMailer.host'),
    service: 'gmail',
    auth: {
      user: configService.get('nodeMailer.user'),
      pass: configService.get('nodeMailer.password'),
    },
  },
});
