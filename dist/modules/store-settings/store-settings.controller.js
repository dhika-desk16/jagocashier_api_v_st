"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreSettingsController = void 0;
const common_1 = require("@nestjs/common");
const store_settings_service_1 = require("./store-settings.service");
const create_store_setting_dto_1 = require("./dto/create-store-setting.dto");
const update_store_setting_dto_1 = require("./dto/update-store-setting.dto");
let StoreSettingsController = class StoreSettingsController {
    storeSettingsService;
    constructor(storeSettingsService) {
        this.storeSettingsService = storeSettingsService;
    }
    create(createStoreSettingDto) {
        return this.storeSettingsService.create(createStoreSettingDto);
    }
    findAll() {
        return this.storeSettingsService.findAll();
    }
    findOne(id) {
        return this.storeSettingsService.findOne(+id);
    }
    update(id, updateStoreSettingDto) {
        return this.storeSettingsService.update(+id, updateStoreSettingDto);
    }
    remove(id) {
        return this.storeSettingsService.remove(+id);
    }
};
exports.StoreSettingsController = StoreSettingsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_store_setting_dto_1.CreateStoreSettingDto]),
    __metadata("design:returntype", void 0)
], StoreSettingsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], StoreSettingsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], StoreSettingsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_store_setting_dto_1.UpdateStoreSettingDto]),
    __metadata("design:returntype", void 0)
], StoreSettingsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], StoreSettingsController.prototype, "remove", null);
exports.StoreSettingsController = StoreSettingsController = __decorate([
    (0, common_1.Controller)('store-settings'),
    __metadata("design:paramtypes", [store_settings_service_1.StoreSettingsService])
], StoreSettingsController);
//# sourceMappingURL=store-settings.controller.js.map