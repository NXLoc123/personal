import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ClientUsersService } from './users.service';
import { JwtAuthGuard } from '../../core/auth/guards/jwtAuth.guard';
import { User } from '../../../shared/decorators/user.decorator';
import { IUser } from '../../core/users/interface/user.interface';
import { UpdateUserWithoutPasswordDto } from '../../core/users/dto/user.dto';
import { getInternalServerErrorResponse } from '../../../shared/libs/getResponse';

@ApiTags('Users')
@Controller('users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class ClientUsersController {
  constructor(private readonly clientUsersService: ClientUsersService) {}

  @Get('profile')
  async getUserProfile(@User() user: IUser) {
    try {
      return user;
    } catch (error) {
      console.log(
        '🚀 ~ file: users.controller.ts:31 ~ ClientUsersController ~ getUserProfile ~ error:',
        error,
      );
    }
  }

  @Patch('profile/update')
  async updateUserProfile(
    @User() { id }: IUser,
    @Body() body: UpdateUserWithoutPasswordDto,
  ) {
    try {
      return await this.clientUsersService.updateUserProfile(id, body);
    } catch (error) {
      console.log(
        '🚀 ~ file: users.controller.ts:38 ~ ClientUsersController ~ error:',
        error,
      );
      return getInternalServerErrorResponse();
    }
  }

  @Patch('profile/change-password')
  changePassword() {}
}
