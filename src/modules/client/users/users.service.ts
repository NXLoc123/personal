import { Injectable } from '@nestjs/common';
import { UsersService } from '../../core/users/users.service';
import { IUpdateUser } from '../../core/users/interface/user.interface';
import { getNoContentSuccessResponse } from '../../../shared/libs/getResponse';

@Injectable()
export class ClientUsersService {
  constructor(private readonly usersService: UsersService) {}

  async updateUserProfile(userId: string, body: IUpdateUser) {
    const result = await this.usersService.updateUserById(userId, body);
    return !result ? null : getNoContentSuccessResponse();
  }
}
