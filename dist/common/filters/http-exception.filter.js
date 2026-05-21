"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllExceptionsFilter = void 0;
const common_1 = require("@nestjs/common");
const response_dto_1 = require("../dto/response.dto");
let AllExceptionsFilter = class AllExceptionsFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const request = ctx.getRequest();
        const response = ctx.getResponse();
        const isHttpException = exception instanceof common_1.HttpException;
        const status = isHttpException
            ? exception.getStatus()
            : common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        const exceptionResponse = isHttpException ? exception.getResponse() : null;
        let message = 'Internal server error';
        let errorCode = 'INTERNAL_SERVER_ERROR';
        let ownedPermissions = undefined;
        if (isHttpException) {
            if (typeof exceptionResponse === 'string') {
                message = exceptionResponse;
            }
            else if (typeof exceptionResponse === 'object') {
                message =
                    exceptionResponse.message ||
                        exceptionResponse.error ||
                        message;
                errorCode =
                    exceptionResponse.code || common_1.HttpStatus[status] || errorCode;
            }
        }
        if (isHttpException && typeof exceptionResponse === 'object') {
            ownedPermissions = exceptionResponse.ownedPermissions;
        }
        response.status(status).json(new response_dto_1.ResponseDto({
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
        }));
    }
};
exports.AllExceptionsFilter = AllExceptionsFilter;
exports.AllExceptionsFilter = AllExceptionsFilter = __decorate([
    (0, common_1.Catch)()
], AllExceptionsFilter);
//# sourceMappingURL=http-exception.filter.js.map