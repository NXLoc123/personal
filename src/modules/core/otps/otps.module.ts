import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Otp } from './entities/otp.entity';
import { OtpsService } from './otps.service';
import { ClientOtpsService } from '../../client/otps/otps.service';
import { MailsService } from '../mails/mails.service';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import { ESmsService } from '../esms/esms.service';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forFeature([Otp, User])],
  providers: [
    OtpsService,
    ClientOtpsService,
    MailsService,
    UsersService,
    ESmsService,
    ConfigService,
  ],
  exports: [OtpsService, ClientOtpsService],
})
export class OtpsModule {}
