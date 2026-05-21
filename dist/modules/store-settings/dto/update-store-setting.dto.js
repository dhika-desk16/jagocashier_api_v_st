"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateStoreSettingDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_store_setting_dto_1 = require("./create-store-setting.dto");
class UpdateStoreSettingDto extends (0, mapped_types_1.PartialType)(create_store_setting_dto_1.CreateStoreSettingDto) {
}
exports.UpdateStoreSettingDto = UpdateStoreSettingDto;
//# sourceMappingURL=update-store-setting.dto.js.map