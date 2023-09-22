import { Module } from '@nestjs/common';
import {
  AppModuleImports,
  AppModuleProviders,
} from './shared/constants/appModule.constant';

@Module({
  imports: [...AppModuleImports],
  providers: [...AppModuleProviders],
})
export class AppModule {}
