import { ResponseDto } from './response.dto';

type MetaPayload = Record<string, unknown>;

export async function createResponse<T>(
  dataOrPromise: T | Promise<T>,
  message = 'Request success',
  meta?: MetaPayload,
): Promise<ResponseDto<T>> {
  const start = Date.now();

  const data =
    dataOrPromise instanceof Promise ? await dataOrPromise : dataOrPromise;

  const durationMs = Date.now() - start;

  return new ResponseDto<T>({
    success: true,
    message,
    data,
    meta: {
      ...meta,
      durationMs,
    },
  });
}
