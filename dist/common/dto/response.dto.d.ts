export interface ErrorMeta {
    statusCode: number;
    code: string;
    path?: string;
    method?: string;
    timestamp: string;
}
export declare class ResponseDto<T = unknown> {
    success: boolean;
    message: string;
    data: T | null;
    error?: ErrorMeta;
    meta?: Record<string, unknown>;
    constructor(partial: Partial<ResponseDto<T>>);
}
