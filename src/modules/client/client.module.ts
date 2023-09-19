import { Module } from '@nestjs/common';
import { ClientAuthModule } from './auth/auth.module';
import { ClientAuthController } from './auth/auth.controller';
import { ClientUsersModule } from './users/users.module';
import { ClientUsersController } from './users/users.controller';
import { ClientOtpsController } from './otps/otps.controller';
import { ClientOtpsModule } from './otps/otps.module';

@Module({
  imports: [ClientAuthModule, ClientUsersModule, ClientOtpsModule],
  controllers: [
    ClientAuthController,
    ClientUsersController,
    ClientOtpsController,
  ],
})
export class ClientModule {}
