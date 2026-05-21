"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreSettingsService = void 0;
const common_1 = require("@nestjs/common");
let StoreSettingsService = class StoreSettingsService {
    create(createStoreSettingDto) {
        return 'This action adds a new storeSetting';
    }
    findAll() {
        return `This action returns all storeSettings`;
    }
    findOne(id) {
        return `This action returns a #${id} storeSetting`;
    }
    update(id, updateStoreSettingDto) {
        return `This action updates a #${id} storeSetting`;
    }
    remove(id) {
        return `This action removes a #${id} storeSetting`;
    }
};
exports.StoreSettingsService = StoreSettingsService;
exports.StoreSettingsService = StoreSettingsService = __decorate([
    (0, common_1.Injectable)()
], StoreSettingsService);
//# sourceMappingURL=store-settings.service.js.map