"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePromotionProductDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_promotion_product_dto_1 = require("./create-promotion-product.dto");
class UpdatePromotionProductDto extends (0, mapped_types_1.PartialType)(create_promotion_product_dto_1.CreatePromotionProductDto) {
}
exports.UpdatePromotionProductDto = UpdatePromotionProductDto;
//# sourceMappingURL=update-promotion-product.dto.js.map