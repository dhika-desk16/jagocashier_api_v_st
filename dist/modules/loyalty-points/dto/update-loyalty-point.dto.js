"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateLoyaltyPointDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_loyalty_point_dto_1 = require("./create-loyalty-point.dto");
class UpdateLoyaltyPointDto extends (0, mapped_types_1.PartialType)(create_loyalty_point_dto_1.CreateLoyaltyPointDto) {
}
exports.UpdateLoyaltyPointDto = UpdateLoyaltyPointDto;
//# sourceMappingURL=update-loyalty-point.dto.js.map