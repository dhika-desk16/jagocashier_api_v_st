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
exports.LoyaltyPointsController = void 0;
const common_1 = require("@nestjs/common");
const loyalty_points_service_1 = require("./loyalty-points.service");
const create_loyalty_point_dto_1 = require("./dto/create-loyalty-point.dto");
const update_loyalty_point_dto_1 = require("./dto/update-loyalty-point.dto");
let LoyaltyPointsController = class LoyaltyPointsController {
    loyaltyPointsService;
    constructor(loyaltyPointsService) {
        this.loyaltyPointsService = loyaltyPointsService;
    }
    create(createLoyaltyPointDto) {
        return this.loyaltyPointsService.create(createLoyaltyPointDto);
    }
    findAll() {
        return this.loyaltyPointsService.findAll();
    }
    findOne(id) {
        return this.loyaltyPointsService.findOne(+id);
    }
    update(id, updateLoyaltyPointDto) {
        return this.loyaltyPointsService.update(+id, updateLoyaltyPointDto);
    }
    remove(id) {
        return this.loyaltyPointsService.remove(+id);
    }
};
exports.LoyaltyPointsController = LoyaltyPointsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_loyalty_point_dto_1.CreateLoyaltyPointDto]),
    __metadata("design:returntype", void 0)
], LoyaltyPointsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], LoyaltyPointsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LoyaltyPointsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_loyalty_point_dto_1.UpdateLoyaltyPointDto]),
    __metadata("design:returntype", void 0)
], LoyaltyPointsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LoyaltyPointsController.prototype, "remove", null);
exports.LoyaltyPointsController = LoyaltyPointsController = __decorate([
    (0, common_1.Controller)('loyalty-points'),
    __metadata("design:paramtypes", [loyalty_points_service_1.LoyaltyPointsService])
], LoyaltyPointsController);
//# sourceMappingURL=loyalty-points.controller.js.map