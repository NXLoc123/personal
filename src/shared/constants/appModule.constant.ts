import { APP_INTERCEPTOR, APP_FILTER, RouterModule } from '@nestjs/core';
import { HttpExceptionFilter } from '../libs/httpException.filter';
import { TransformInterceptor } from '../libs/transform.interceptor';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { envConfig, envFilePath } from '../../config/envConfig';
import { databaseConfig } from '../../config/ormConfig';
import { ClientModule } from '../../modules/client/client.module';

export const AppModuleProviders = [
  {
    provide: APP_INTERCEPTOR,
    useClass: TransformInterceptor,
  },
  {
    provide: APP_FILTER,
    useClass: HttpExceptionFilter,
  },
];

export const AppModuleImports = [
  ConfigModule.forRoot({
    load: [envConfig],
    envFilePath: envFilePath(),
  }),

  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: databaseConfig,
  }),

  ClientModule,
  RouterModule.register([
    {
      path: 'api/client',
      module: ClientModule,
    },
  ]),
];
