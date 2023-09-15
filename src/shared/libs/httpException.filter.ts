import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { isArray } from 'class-validator';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}
  catch(exception: HttpException, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();

    const httpStatus = exception.getStatus();
    const { message }: any = exception.getResponse();
    const statusCode = httpStatus;
    const messageResponse = message === isArray(message) ? message[0] : message;

    const bodyResponse = { statusCode, message: messageResponse };
    httpAdapter.reply(ctx.getResponse(), bodyResponse, httpStatus);
  }
}
