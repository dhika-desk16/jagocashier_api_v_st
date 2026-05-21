"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionItemsModule = void 0;
const common_1 = require("@nestjs/common");
const transaction_items_service_1 = require("./transaction-items.service");
const transaction_items_controller_1 = require("./transaction-items.controller");
let TransactionItemsModule = class TransactionItemsModule {
};
exports.TransactionItemsModule = TransactionItemsModule;
exports.TransactionItemsModule = TransactionItemsModule = __decorate([
    (0, common_1.Module)({
        controllers: [transaction_items_controller_1.TransactionItemsController],
        providers: [transaction_items_service_1.TransactionItemsService],
    })
], TransactionItemsModule);
//# sourceMappingURL=transaction-items.module.js.map