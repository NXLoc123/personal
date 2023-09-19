import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import {
  ICheckExistProfileDetail,
  ICreateUser,
  IUpdateUser,
  IUserFilter,
} from './interface/user.interface';
import { MailsService } from '../mails/mails.service';

type IUserQuery = FindOptionsWhere<User> | FindOptionsWhere<User>[];

export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly mailsService: MailsService,
  ) {}
  async checkTheExistenceProfileRegister({
    email,
    phoneNumber,
  }: ICheckExistProfileDetail) {
    const userQuery = [{ email }, { phoneNumber }];
    const result = await this.findOneUserByQuery(userQuery);
    return !!result;
  }

  async createNewUser(body: ICreateUser) {
    try {
      const user = this.userRepository.create(body);
      return await this.userRepository.save(user);
    } catch (error) {
      throw error;
    }
  }

  async findOneUserByQuery(query: IUserQuery) {
    try {
      return await this.userRepository.findOneBy(query);
    } catch (error) {
      throw error;
    }
  }

  async getListUsersByFilter(filter: IUserFilter) {
    try {
      let options: IUserFilter = {};
      if (filter.role) options = { role: filter.role };
      if (filter.status) options = { ...options, status: filter.status };
      const query = { where: options };
      return await this.userRepository.find(query);
    } catch (error) {
      throw error;
    }
  }

  async updateUserById(id: string, body: IUpdateUser) {
    try {
      const result = await this.userRepository.update(id, body);
      return !!result.affected;
    } catch (error) {
      throw error;
    }
  }

  async deleteUserById(id: string) {
    try {
      const result = await this.userRepository.delete(id);
      return !!result.affected;
    } catch (error) {
      throw error;
    }
  }
}
