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

  @ApiProperty({ example: 'locboybn26@gmail.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: '0912123342' })
  @IsPhoneNumber('VN')
  @IsNotEmpty()
  phoneNumber: string;

  @ApiProperty({ example: '12121212' })
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
