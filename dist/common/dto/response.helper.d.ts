import { ResponseDto } from './response.dto';
type MetaPayload = Record<string, unknown>;
export declare function createResponse<T>(dataOrPromise: T | Promise<T>, message?: string, meta?: MetaPayload): Promise<ResponseDto<T>>;
export {};
