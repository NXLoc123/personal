import { ApiProperty } from '@nestjs/swagger';
import { CreateUserDto } from '../../users/dto/user.dto';

export class LoginDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}

export class RegisterDto extends CreateUserDto {}
