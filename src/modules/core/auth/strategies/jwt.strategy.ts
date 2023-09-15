import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { IPayload } from '../interfaces/auth.interface';
import { UsersService } from '../../users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private readonly usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('secret.jwt'),
    });
  }

  async validate(payload: IPayload) {
    const userId = payload.id;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userProfile } =
      await this.usersService.findOneUserByQuery({ id: userId });
    return userProfile;
  }
}
