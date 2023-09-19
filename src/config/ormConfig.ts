import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from '../modules/core/users/entities/user.entity';
import { Otp } from '../modules/core/otps/entities/otp.entity';

export const databaseConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: configService.get('database.host'),
  port: configService.get<number>('database.port'),
  username: configService.get('database.username'),
  password: configService.get('database.password'),
  database: configService.get('database.name'),
  entities: [...ENTITIES],
  synchronize: true,
  //   migrations: ['dist/migrations/*.js', 'src/migration/*.ts'],
  //   migrationsRun: false,
});

const ENTITIES = [User, Otp];
