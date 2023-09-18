import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { Injectable } from '@nestjs/common';
import { ILogin } from '../interfaces/auth.interface';
const USERNAME_FIELD = 'email';
@Injectable()
export class LoginStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: USERNAME_FIELD,
    });
  }

  async validate(email: string, password: string) {
    try {
      const body: ILogin = {
        email,
        password,
      };

      return await this.authService.validateUser(body);
    } catch (error) {
      console.log(
        '🚀 ~ file: login.strategy.ts:23 ~ LoginStrategy ~ validate ~ error:',
        error,
      );
      return null;
    }
  }
}
