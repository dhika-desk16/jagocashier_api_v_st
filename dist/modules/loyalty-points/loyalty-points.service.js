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
exports.LoyaltyPointsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const response_helper_1 = require("../../common/dto/response.helper");
let LoyaltyPointsService = class LoyaltyPointsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    create(createLoyaltyPointDto) {
        return 'This action adds a new loyaltyPoint';
    }
    async findAll() {
        const loyaltyPoints = await this.prisma.loyaltyPoint.findMany();
        return (0, response_helper_1.createResponse)(loyaltyPoints);
    }
    findOne(id) {
        return `This action returns a #${id} loyaltyPoint`;
    }
    update(id, updateLoyaltyPointDto) {
        return `This action updates a #${id} loyaltyPoint`;
    }
    remove(id) {
        return `This action removes a #${id} loyaltyPoint`;
    }
};
exports.LoyaltyPointsService = LoyaltyPointsService;
exports.LoyaltyPointsService = LoyaltyPointsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], LoyaltyPointsService);
//# sourceMappingURL=loyalty-points.service.js.map