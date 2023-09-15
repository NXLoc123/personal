import { ApiProperty, OmitType, PartialType, PickType } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsPhoneNumber('VN')
  @IsNotEmpty()
  phoneNumber: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class UpdateUserWithoutPasswordDto extends PartialType(
  OmitType(CreateUserDto, ['password']),
) {}

export class UpdateUserPasswordDto extends PickType(CreateUserDto, [
  'password',
]) {}
