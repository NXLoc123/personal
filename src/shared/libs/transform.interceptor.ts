import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpStatus,
  RequestTimeoutException,
} from '@nestjs/common';
import { Observable, TimeoutError, throwError } from 'rxjs';
import { catchError, map, timeout } from 'rxjs/operators';
import { instanceToPlain } from 'class-transformer';
import { HttpMethod } from '../enums/httpMethod.enum';

export interface Response<T> {
  data: T;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    const request = context.switchToHttp().getRequest();
    const { url, method } = request;
    const now = new Date().toISOString();
    return next.handle().pipe(
      map((data) => this.handleData(method, instanceToPlain(data), context)),
      timeout(5000),
      catchError((err) => {
        console.log(`💥ERROR💥 ${method}  ~ ${url}... ${now}`);
        if (err instanceof TimeoutError) {
          return throwError(() => new RequestTimeoutException());
        }
        return throwError(() => err);
      }),
    );
  }

  handleData(method: string, data: any, context: ExecutionContext) {
    let status = HttpStatus.OK;

    if (!data) status = HttpStatus.OK;

    if (data?.statusCode) {
      status = data.statusCode;
    }

    if (data && method === HttpMethod.POST && status === HttpStatus.OK) {
      status = HttpStatus.CREATED;
    }
    context.switchToHttp().getResponse().status(status);

    return data;
  }
}
