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
exports.PromotionProductsController = void 0;
const common_1 = require("@nestjs/common");
const promotion_products_service_1 = require("./promotion-products.service");
const create_promotion_product_dto_1 = require("./dto/create-promotion-product.dto");
const update_promotion_product_dto_1 = require("./dto/update-promotion-product.dto");
let PromotionProductsController = class PromotionProductsController {
    promotionProductsService;
    constructor(promotionProductsService) {
        this.promotionProductsService = promotionProductsService;
    }
    create(createPromotionProductDto) {
        return this.promotionProductsService.create(createPromotionProductDto);
    }
    findAll() {
        return this.promotionProductsService.findAll();
    }
    findOne(id) {
        return this.promotionProductsService.findOne(+id);
    }
    update(id, updatePromotionProductDto) {
        return this.promotionProductsService.update(+id, updatePromotionProductDto);
    }
    remove(id) {
        return this.promotionProductsService.remove(+id);
    }
};
exports.PromotionProductsController = PromotionProductsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_promotion_product_dto_1.CreatePromotionProductDto]),
    __metadata("design:returntype", void 0)
], PromotionProductsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PromotionProductsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PromotionProductsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_promotion_product_dto_1.UpdatePromotionProductDto]),
    __metadata("design:returntype", void 0)
], PromotionProductsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PromotionProductsController.prototype, "remove", null);
exports.PromotionProductsController = PromotionProductsController = __decorate([
    (0, common_1.Controller)('promotion-products'),
    __metadata("design:paramtypes", [promotion_products_service_1.PromotionProductsService])
], PromotionProductsController);
//# sourceMappingURL=promotion-products.controller.js.map