import { Module } from '@nestjs/common';
import { OtpsModule } from '../../core/otps/otps.module';

@Module({
  imports: [OtpsModule],
  providers: [OtpsModule],
  exports: [OtpsModule],
})
export class ClientOtpsModule {}
