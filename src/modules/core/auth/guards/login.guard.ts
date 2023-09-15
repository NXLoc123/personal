import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthGuardTypes } from '../constants/passport.constant';

@Injectable()
export class LoginGuard extends AuthGuard(AuthGuardTypes.Login) {}
