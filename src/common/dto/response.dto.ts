export class ResponseDto<T = any> {
  success: boolean;
  message: string;
  data: T;
  meta?: any;

  constructor(partial: Partial<ResponseDto<T>>) {
    Object.assign(this, partial);
  }
}
