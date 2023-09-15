import { Column, Entity } from 'typeorm';
import { UserRoleTypes, UserStatusTypes } from '../enum/user.enum';
import { IUserRoles, IUserStatuses } from '../interface/user.interface';
import { BaseEntity } from '../../../../shared/entities/base.entity';

@Entity('users')
export class User extends BaseEntity {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  phoneNumber: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: UserRoleTypes, default: UserRoleTypes.User })
  role: IUserRoles;

  @Column({
    type: 'enum',
    enum: UserStatusTypes,
    default: UserStatusTypes.Unverified,
  })
  status: IUserStatuses;
}
