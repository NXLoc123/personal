import { ApiProperty } from '@nestjs/swagger';
import { CreateUserDto } from '../../users/dto/user.dto';
import { IsEnum, IsNotEmpty, IsString, Length } from 'class-validator';
import { OtpDestinationTypes } from '../../otps/enums/otp.enum';
import { IOtpDestinationType } from '../../otps/interfaces/otp.interface';

export class LoginDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}

export class RegisterDto extends CreateUserDto {
  @ApiProperty()
  @IsString()
  @Length(6, 6)
  otpCode: string;

  @ApiProperty({ example: OtpDestinationTypes.Email })
  @IsEnum(OtpDestinationTypes)
  @IsNotEmpty()
  otpDestinationType: IOtpDestinationType;
}
