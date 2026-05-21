"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseDto = void 0;
class ResponseDto {
    success;
    message;
    data;
    error;
    meta;
    constructor(partial) {
        Object.assign(this, partial);
    }
}
exports.ResponseDto = ResponseDto;
//# sourceMappingURL=response.dto.js.map