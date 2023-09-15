import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthGuardTypes } from '../constants/passport.constant';

@Injectable()
export class JwtAuthGuard extends AuthGuard(AuthGuardTypes.Jwt) {}
