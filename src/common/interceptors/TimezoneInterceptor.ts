import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

@Injectable()
export class TimezoneInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        return ensureTimezoneJakarta(data);
      }),
    );
  }
}

function ensureTimezoneJakarta(obj: any): any {
  if (!obj) return obj;

  try {
    if (obj instanceof Date) {
      return dayjs(obj).tz('Asia/Jakarta', true).format('YYYY-MM-DD HH:mm:ss');
    }

    if (Array.isArray(obj)) return obj.map(ensureTimezoneJakarta);

    if (typeof obj === 'object') {
      return Object.fromEntries(
        Object.entries(obj).map(([k, v]) => [k, ensureTimezoneJakarta(v)]),
      );
    }

    return obj;
  } catch (err) {
    console.error('[ensureTimezoneJakarta] ERROR on obj:', obj, err);
    return obj;
  }
}
