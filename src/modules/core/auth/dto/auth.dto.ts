import { ApiProperty } from '@nestjs/swagger';
import { CreateUserDto } from '../../users/dto/user.dto';
import { IsString, Length } from 'class-validator';

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
}
