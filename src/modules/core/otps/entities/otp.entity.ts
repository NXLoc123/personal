import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../../../shared/entities/base.entity';
import {
  OtpDestinationTypes,
  OtpStatusTypes,
  OtpTypes,
} from '../enums/otp.enum';
import {
  IOtpDestinationType,
  IOtpStatusType,
  IOtpType,
} from '../interfaces/otp.interface';

@Entity('otps')
export class Otp extends BaseEntity {
  @Column({ nullable: false })
  otpCode: string;

  @Column({ type: 'enum', enum: OtpDestinationTypes, nullable: false })
  otpDestinationType: IOtpDestinationType;

  @Column({ nullable: false })
  otpDestination: string;

  @Column({ type: 'enum', enum: OtpTypes, nullable: false })
  otpType: IOtpType;

  @Column({
    type: 'enum',
    enum: OtpStatusTypes,
    default: OtpStatusTypes.Created,
    nullable: false,
  })
  otpStatus: IOtpStatusType;

  @Column({ type: 'timestamptz', nullable: false })
  expiredAt: Date;
}
