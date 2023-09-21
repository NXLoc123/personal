import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Otp } from './entities/otp.entity';
import { OtpsService } from './otps.service';
import { ClientOtpsService } from '../../client/otps/otps.service';
import { MailsService } from '../mails/mails.service';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import { ESmsService } from '../esms/esms.service';
import { ConfigService } from '@nestjs/config';
import { OtpMiddleware } from './middleware/otps.middleware';
import { API_PATH } from '../../../shared/constants/path.constant';
import { getBodyRouteOfMiddleWare } from './constant/otps.constant';

const sendRegisterRequestOtp = getBodyRouteOfMiddleWare(
  API_PATH.SEND_OTP_REQUEST,
  RequestMethod.POST,
);
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
export class OtpsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(OtpMiddleware).forRoutes(sendRegisterRequestOtp);
  }
}
