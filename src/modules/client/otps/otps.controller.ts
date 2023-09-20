import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ClientOtpsService } from './otps.service';
import { getInternalServerErrorResponse } from '../../../shared/libs/getResponse';
import { CreateOtpDto } from '../../core/otps/dto/otp.dto';
import { OtpDestinationTypes } from '../../core/otps/enums/otp.enum';

@ApiTags('Otps')
@Controller('otps')
export class ClientOtpsController {
  constructor(private readonly clientOtpsService: ClientOtpsService) {}

  @Post('send-mail')
  async sendOtpByEmail(@Body() body: CreateOtpDto) {
    try {
      switch (body.otpDestinationType) {
        case OtpDestinationTypes.Email:
          return await this.clientOtpsService.sendOtpByMail(body);
        case OtpDestinationTypes.Phone:
          return await this.clientOtpsService.sendOtpBySms(body);
      }
    } catch (error) {
      console.log(
        '🚀 ~ file: otps.controller.ts:15 ~ ClientOtpsController ~ sendOtpByEmail ~ error:',
        error,
      );
      return getInternalServerErrorResponse();
    }
  }
}
