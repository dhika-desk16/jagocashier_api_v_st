/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ResponseDto } from '../dto/response.dto';

interface RawResponse<T = any> {
  data: T;
  message?: string;
  meta?: any;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, ResponseDto<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ResponseDto<T>> {
    return next.handle().pipe(
      map((data) => {
        if (data instanceof ResponseDto) return data;

        if (data && typeof data === 'object' && 'data' in data) {
          const raw = data as RawResponse<T>;
          return new ResponseDto<T>({
            success: true,
            message: raw.message || 'Request success',
            data: raw.data,
            meta: raw.meta,
          });
        }

        return new ResponseDto<T>({
          success: true,
          message: 'Request success',
          data,
        });
      }),
    );
  }
}
