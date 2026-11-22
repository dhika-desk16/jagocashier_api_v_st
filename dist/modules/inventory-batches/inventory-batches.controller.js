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
exports.InventoryBatchesController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const permission_guard_1 = require("../../common/permissions/permission.guard");
const inventory_batches_service_1 = require("./inventory-batches.service");
const receive_batch_dto_1 = require("./dto/receive-batch.dto");
let InventoryBatchesController = class InventoryBatchesController {
    service;
    constructor(service) {
        this.service = service;
    }
    receive(dto) {
        return this.service.receive(dto);
    }
    expiring(storeId, days) {
        return this.service.findExpiring(+storeId, days ? +days : 30);
    }
    writeOff(storeId, req) {
        return this.service.writeOffExpired(storeId, req.user.userId);
    }
};
exports.InventoryBatchesController = InventoryBatchesController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [receive_batch_dto_1.ReceiveBatchDto]),
    __metadata("design:returntype", void 0)
], InventoryBatchesController.prototype, "receive", null);
__decorate([
    (0, common_1.Get)('expiring'),
    __param(0, (0, common_1.Query)('storeId')),
    __param(1, (0, common_1.Query)('days')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], InventoryBatchesController.prototype, "expiring", null);
__decorate([
    (0, common_1.Post)('write-off-expired'),
    __param(0, (0, common_1.Body)('storeId')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], InventoryBatchesController.prototype, "writeOff", null);
exports.InventoryBatchesController = InventoryBatchesController = __decorate([
    (0, common_1.Controller)('inventory-batches'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permission_guard_1.PermissionGuard),
    __metadata("design:paramtypes", [inventory_batches_service_1.InventoryBatchesService])
], InventoryBatchesController);
//# sourceMappingURL=inventory-batches.controller.js.map