"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateStockTransferDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_stock_transfer_dto_1 = require("./create-stock-transfer.dto");
class UpdateStockTransferDto extends (0, mapped_types_1.PartialType)(create_stock_transfer_dto_1.CreateStockTransferDto) {
}
exports.UpdateStockTransferDto = UpdateStockTransferDto;
//# sourceMappingURL=update-stock-transfer.dto.js.map