"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateReceivableDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_receivable_dto_1 = require("./create-receivable.dto");
class UpdateReceivableDto extends (0, mapped_types_1.PartialType)(create_receivable_dto_1.CreateReceivableDto) {
}
exports.UpdateReceivableDto = UpdateReceivableDto;
//# sourceMappingURL=update-receivable.dto.js.map