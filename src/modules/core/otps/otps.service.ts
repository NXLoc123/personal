import { InjectRepository } from '@nestjs/typeorm';
import { Otp } from './entities/otp.entity';
import { FindManyOptions, Repository } from 'typeorm';
import { getRandomStringNumberByLength } from '../../../shared/libs/helper';
import { ICreateOtp, ISendOtpByMailBody } from './interfaces/otp.interface';
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

  async findOtpByQuery(query: FindManyOptions<Otp>) {
    try {
      return await this.otpsRepository.find(query);
    } catch (error) {
      throw error;
    }
  }
}
