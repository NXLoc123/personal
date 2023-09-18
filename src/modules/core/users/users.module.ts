import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { ClientUsersService } from '../../client/users/users.service';
import { JwtStrategy } from '../auth/strategies/jwt.strategy';
import { ConfigService } from '@nestjs/config';
import { MailsModule } from '../mails/mails.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), MailsModule],
  providers: [UsersService, ClientUsersService, JwtStrategy, ConfigService],
  exports: [UsersService, ClientUsersService],
})
export class UsersModule {}
