"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createResponse = createResponse;
const response_dto_1 = require("./response.dto");
async function createResponse(dataOrPromise, message = 'Request success', meta) {
    const start = Date.now();
    const data = dataOrPromise instanceof Promise ? await dataOrPromise : dataOrPromise;
    const durationMs = Date.now() - start;
    return new response_dto_1.ResponseDto({
        success: true,
        message,
        data,
        meta: {
            ...meta,
            durationMs,
        },
    });
}
//# sourceMappingURL=response.helper.js.map