import { Module } from '@nestjs/common';
import { AuthModule } from '../../core/auth/auth.module';

@Module({
  imports: [AuthModule],
  providers: [AuthModule],
  exports: [AuthModule],
})
export class ClientAuthModule {}
