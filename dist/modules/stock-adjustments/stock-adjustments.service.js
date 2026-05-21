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
Object.defineProperty(exports, "__esModule", { value: true });
exports.StockAdjustmentsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const response_helper_1 = require("../../common/dto/response.helper");
let StockAdjustmentsService = class StockAdjustmentsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    create(createStockAdjustmentDto) {
        return 'This action adds a new stockAdjustment';
    }
    async findAll() {
        const stockAdjustments = await this.prisma.stockAdjustment.findMany();
        return (0, response_helper_1.createResponse)(stockAdjustments);
    }
    findOne(id) {
        return `This action returns a #${id} stockAdjustment`;
    }
    update(id, updateStockAdjustmentDto) {
        return `This action updates a #${id} stockAdjustment`;
    }
    remove(id) {
        return `This action removes a #${id} stockAdjustment`;
    }
};
exports.StockAdjustmentsService = StockAdjustmentsService;
exports.StockAdjustmentsService = StockAdjustmentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], StockAdjustmentsService);
//# sourceMappingURL=stock-adjustments.service.js.map