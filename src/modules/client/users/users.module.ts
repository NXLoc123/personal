import { Module } from '@nestjs/common';
import { UsersModule } from '../../core/users/users.module';

@Module({
  imports: [UsersModule],
  providers: [UsersModule],
  exports: [UsersModule],
})
export class ClientUsersModule {}
