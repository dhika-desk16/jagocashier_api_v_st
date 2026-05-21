"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateReceiptDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_receipt_dto_1 = require("./create-receipt.dto");
class UpdateReceiptDto extends (0, mapped_types_1.PartialType)(create_receipt_dto_1.CreateReceiptDto) {
}
exports.UpdateReceiptDto = UpdateReceiptDto;
//# sourceMappingURL=update-receipt.dto.js.map