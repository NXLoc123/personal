import { HttpStatus } from '@nestjs/common';
import { ERROR_MESSAGES } from '../constants/baseError.constant';

export function getErrorResponse(statusCode: HttpStatus, message: string) {
  return { statusCode, message };
}

export function getNoContentSuccessResponse() {
  return { statusCode: HttpStatus.NO_CONTENT, message: '' };
}

export function getInternalServerErrorResponse() {
  return {
    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    message: ERROR_MESSAGES.Common.INTERNAL_SERVER_ERROR,
  };
}
