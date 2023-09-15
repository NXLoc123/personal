import { SetMetadata } from '@nestjs/common';
import { UserRoleTypes } from '../enum/user.enum';
import { RoleKeyTypes } from '../../auth/enum/roles.enum';

export const Roles = (role: UserRoleTypes) =>
  SetMetadata(RoleKeyTypes.Admin, role);
