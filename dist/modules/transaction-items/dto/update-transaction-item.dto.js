"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTransactionItemDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_transaction_item_dto_1 = require("./create-transaction-item.dto");
class UpdateTransactionItemDto extends (0, mapped_types_1.PartialType)(create_transaction_item_dto_1.CreateTransactionItemDto) {
}
exports.UpdateTransactionItemDto = UpdateTransactionItemDto;
//# sourceMappingURL=update-transaction-item.dto.js.map