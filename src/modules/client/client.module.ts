import { Module } from '@nestjs/common';
import { ClientAuthModule } from './auth/auth.module';
import { ClientAuthController } from './auth/auth.controller';
import { ClientUsersModule } from './users/users.module';
import { ClientUsersController } from './users/users.controller';

@Module({
  imports: [ClientAuthModule, ClientUsersModule],
  controllers: [ClientAuthController, ClientUsersController],
})
export class ClientModule {}
