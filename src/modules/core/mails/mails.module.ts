import { Module } from '@nestjs/common';
import { MailsService } from './mails.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { nodeMailerConfig } from '../../../config/nodemailerConfig';

@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: nodeMailerConfig,
    }),
  ],
  exports: [MailsService],
  providers: [MailsService],
})
export class MailsModule {}
