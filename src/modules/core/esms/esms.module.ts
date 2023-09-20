import { Module } from '@nestjs/common';
import { ESmsService } from './esms.service';
import { ConfigService } from '@nestjs/config';

@Module({
  providers: [ESmsService, ConfigService],
  exports: [ESmsService],
})
export class ESmsModule {}
