import { HttpStatus } from '@nestjs/common';

export interface IBaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

export interface IErrorResponse {
  statusCode: HttpStatus;
  message: string;
}
