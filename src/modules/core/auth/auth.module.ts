import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoginStrategy } from './strategies/login.strategy';
import { PassportModule } from '@nestjs/passport';
import { ClientAuthService } from '../../client/auth/auth.service';
import { UsersService } from '../users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { MailsModule } from '../mails/mails.module';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('secret.jwt'),
        signOptions: {
          expiresIn: configService.get('secret.expiresIn'),
        },
      }),
    }),
    TypeOrmModule.forFeature([User]),

    MailsModule,
    PassportModule,
  ],
  providers: [AuthService, LoginStrategy, ClientAuthService, UsersService],
  exports: [AuthService, ClientAuthService],
})
export class AuthModule {}
