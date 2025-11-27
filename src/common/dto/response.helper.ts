/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ResponseDto } from './response.dto';

export const createResponse = async <T>(
  dataOrPromise: T | Promise<T>,
  message = 'Request success',
  meta?: any,
) => {
  const start = performance.now();

  const data =
    dataOrPromise instanceof Promise ? await dataOrPromise : dataOrPromise;

  const duration = performance.now() - start;

  const fullMeta = {
    ...meta,
    duration: `${duration.toFixed(4)}ms`,
  };

  return new ResponseDto<T>({ success: true, message, data, meta: fullMeta });
};
