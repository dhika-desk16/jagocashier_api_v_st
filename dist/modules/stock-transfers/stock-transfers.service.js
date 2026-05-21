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
exports.StockTransfersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const response_helper_1 = require("../../common/dto/response.helper");
let StockTransfersService = class StockTransfersService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    create(createStockTransferDto) {
        return 'This action adds a new stockTransfer';
    }
    async findAll() {
        const stockTransfers = await this.prisma.stockTransfer.findMany();
        return (0, response_helper_1.createResponse)(stockTransfers);
    }
    findOne(id) {
        return `This action returns a #${id} stockTransfer`;
    }
    update(id, updateStockTransferDto) {
        return `This action updates a #${id} stockTransfer`;
    }
    remove(id) {
        return `This action removes a #${id} stockTransfer`;
    }
};
exports.StockTransfersService = StockTransfersService;
exports.StockTransfersService = StockTransfersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], StockTransfersService);
//# sourceMappingURL=stock-transfers.service.js.map