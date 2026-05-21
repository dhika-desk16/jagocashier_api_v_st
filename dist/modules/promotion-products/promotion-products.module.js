"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromotionProductsModule = void 0;
const common_1 = require("@nestjs/common");
const promotion_products_service_1 = require("./promotion-products.service");
const promotion_products_controller_1 = require("./promotion-products.controller");
let PromotionProductsModule = class PromotionProductsModule {
};
exports.PromotionProductsModule = PromotionProductsModule;
exports.PromotionProductsModule = PromotionProductsModule = __decorate([
    (0, common_1.Module)({
        controllers: [promotion_products_controller_1.PromotionProductsController],
        providers: [promotion_products_service_1.PromotionProductsService],
    })
], PromotionProductsModule);
//# sourceMappingURL=promotion-products.module.js.map