import { HttpStatus } from '@nestjs/common';
import { COMMON_ERROR_MESSAGE } from '../constants/baseError.constant';

export function getErrorResponse(statusCode: HttpStatus, message: string) {
  return { statusCode, message };
}

export function getNoContentSuccessResponse() {
  return { statusCode: HttpStatus.NO_CONTENT, message: '' };
}

export function getInternalServerErrorResponse() {
  return {
    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    message: COMMON_ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
  };
}
