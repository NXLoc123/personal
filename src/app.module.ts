import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { envConfig, envPathFile } from './config/envConfig';
import { databaseConfig } from './config/ormConfig';
import { ClientModule } from './modules/client/client.module';
import { APP_FILTER, APP_INTERCEPTOR, RouterModule } from '@nestjs/core';
import { TransformInterceptor } from './shared/libs/transform.interceptor';
import { HttpExceptionFilter } from './shared/libs/httpException.filter';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [envConfig],
      envFilePath: envPathFile(),
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
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
