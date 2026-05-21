"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateLoyaltyTransactionDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_loyalty_transaction_dto_1 = require("./create-loyalty-transaction.dto");
class UpdateLoyaltyTransactionDto extends (0, mapped_types_1.PartialType)(create_loyalty_transaction_dto_1.CreateLoyaltyTransactionDto) {
}
exports.UpdateLoyaltyTransactionDto = UpdateLoyaltyTransactionDto;
//# sourceMappingURL=update-loyalty-transaction.dto.js.map