/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ResponseDto } from '../dto/response.dto';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    const isHttpException = exception instanceof HttpException;

    const status = isHttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    const exceptionResponse = isHttpException ? exception.getResponse() : null;

    let message = 'Internal server error';
    let errorCode = 'INTERNAL_SERVER_ERROR';
    let ownedPermissions: any = undefined;

    if (isHttpException) {
      if (typeof exceptionResponse === 'string') {
        message = exceptionResponse;
      } else if (typeof exceptionResponse === 'object') {
        message =
          (exceptionResponse as any).message ||
          (exceptionResponse as any).error ||
          message;

        errorCode =
          (exceptionResponse as any).code || HttpStatus[status] || errorCode;
      }
    }

    if (isHttpException && typeof exceptionResponse === 'object') {
      ownedPermissions = (exceptionResponse as any).ownedPermissions;
    }

    response.status(status).json(
      new ResponseDto({
        success: false,
        message,
        data: null,
        error: {
          statusCode: status,
          code: errorCode,
          path: request.url,
          method: request.method,
          timestamp: new Date().toISOString(),
        },
        meta: ownedPermissions ? { ownedPermissions } : undefined,
      }),
    );
  }
}
