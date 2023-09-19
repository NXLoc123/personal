import { ApiProperty } from '@nestjs/swagger';
import { OtpDestinationTypes, OtpTypes } from '../enums/otp.enum';
import { IsEmail, IsEnum, IsNotEmpty, IsPhoneNumber } from 'class-validator';
import { IOtpDestinationType, IOtpType } from '../interfaces/otp.interface';

export class CreateOtpDto {
  @ApiProperty({ example: OtpTypes.Register })
  @IsEnum(OtpTypes)
  @IsNotEmpty()
  otpType: IOtpType;

  @ApiProperty()
  @IsPhoneNumber('VN')
  @IsNotEmpty()
  phoneNumber: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: OtpDestinationTypes.Email })
  @IsEnum(OtpDestinationTypes)
  @IsNotEmpty()
  otpDestinationType: IOtpDestinationType;
}
