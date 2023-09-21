import { InjectRepository } from '@nestjs/typeorm';
import { Otp } from './entities/otp.entity';
import { Repository } from 'typeorm';
import {
  getRandomStringNumberByLength,
  setStartAndEndOfDateByTime,
} from '../../../shared/libs/helper';
import {
  ICreateOtp,
  IOtpDestinationType,
  IQueryProfileRegisterOtp,
  ISendOtpByMailBody,
} from './interfaces/otp.interface';
import { OtpDestinationTypes, OtpStatusTypes } from './enums/otp.enum';

export class OtpsService {
  constructor(
    @InjectRepository(Otp) private readonly otpsRepository: Repository<Otp>,
  ) {}
  private THREE_MINUTES_IN_MILLISECONDS = 3 * 60 * 1000;
  private generateOtpCode(): string {
    const otpCodeLength = 6;
    return getRandomStringNumberByLength(otpCodeLength);
  }

  private async saveOtp(body: ICreateOtp) {
    try {
      const result = this.otpsRepository.create(body);
      return await this.otpsRepository.save(result);
    } catch (error) {
      throw error;
    }
  }

  async getOtpRequestAttempts(otpDestination: string) {
    try {
      const { startOfDay, endOfDay } = setStartAndEndOfDateByTime(new Date());
      const queryBuilder = this.otpsRepository.createQueryBuilder('otps');
      queryBuilder
        .where({
          otpDestination,
        })
        .andWhere('otps.createdAt BETWEEN :startOfDay AND :endOfDay', {
          startOfDay,
          endOfDay,
        });
      const otpsListInThisDay = await queryBuilder.getMany();
      return otpsListInThisDay.length;
    } catch (error) {
      throw error;
    }
  }

  async checkOtpCode(
    otpCode: string,
    otpDestination: string,
    otpDestinationType: IOtpDestinationType,
  ) {
    const params: IQueryProfileRegisterOtp = {
      otpDestination,
      otpDestinationType,
    };
    const currentOtp = await this.findProfileRegisterOtp(params);
    const isInvalidOtpCode =
      !currentOtp ||
      new Date(currentOtp.expiredAt) < new Date() ||
      currentOtp.otpCode !== otpCode;
    if (isInvalidOtpCode) return false;
    return await this.updateOtpStatus(currentOtp.id);
  }

  async createNewOtp({
    email,
    phoneNumber,
    otpType,
    otpDestinationType,
  }: ISendOtpByMailBody) {
    const expiredAt = new Date(Date.now() + this.THREE_MINUTES_IN_MILLISECONDS);
    const otpCode = this.generateOtpCode();
    const otpStatus = OtpStatusTypes.Created;
    const result: ICreateOtp = {
      otpCode,
      otpType,
      expiredAt,
      otpStatus,
      otpDestinationType,
      otpDestination: null,
    };
    switch (otpDestinationType) {
      case OtpDestinationTypes.Email:
        result.otpDestination = email;
        break;
      case OtpDestinationTypes.Phone:
        result.otpDestination = phoneNumber;
        break;
    }

    return await this.saveOtp(result);
  }

  async findProfileRegisterOtp(params: IQueryProfileRegisterOtp) {
    try {
      const queryBuilder = this.otpsRepository.createQueryBuilder('otps');
      queryBuilder
        .where({ ...params, otpStatus: OtpStatusTypes.Created })
        .orderBy('otps.createdAt', 'DESC');
      return await queryBuilder.getOne();
    } catch (error) {
      throw error;
    }
  }

  async updateOtpStatus(id: string) {
    try {
      await this.otpsRepository.update(id, {
        otpStatus: OtpStatusTypes.Verified,
      });
      return true;
    } catch (error) {
      console.log(
        '🚀 ~ file: otps.service.ts:98 ~ OtpsService ~ updateOtpStatus ~ error:',
        error,
      );
      return false;
    }
  }
}
