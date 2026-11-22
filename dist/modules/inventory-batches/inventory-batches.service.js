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
exports.InventoryBatchesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const response_helper_1 = require("../../common/dto/response.helper");
const todayUtc = () => {
    const n = new Date();
    return new Date(Date.UTC(n.getFullYear(), n.getMonth(), n.getDate()));
};
let InventoryBatchesService = class InventoryBatchesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async receive(dto) {
        const batch = await this.prisma.$transaction(async (tx) => {
            const product = await tx.product.findUnique({
                where: { id: dto.productId },
            });
            if (!product || !product.isActive) {
                throw new common_1.BadRequestException('Produk tidak tersedia');
            }
            if (!product.hasExpiry) {
                throw new common_1.BadRequestException('Produk ini tidak memakai tanggal kedaluwarsa');
            }
            const expiry = new Date(dto.expiryDate);
            if (expiry < todayUtc()) {
                throw new common_1.BadRequestException('Tanggal kedaluwarsa sudah lewat');
            }
            const inventory = await tx.inventory.upsert({
                where: {
                    productId_storeId: {
                        productId: dto.productId,
                        storeId: dto.storeId,
                    },
                },
                update: { quantity: { increment: dto.quantity } },
                create: {
                    productId: dto.productId,
                    storeId: dto.storeId,
                    quantity: dto.quantity,
                    minimumStock: 0,
                    maximumStock: 0,
                    averageCost: dto.costPrice,
                },
            });
            return tx.inventoryBatch.create({
                data: {
                    inventoryId: inventory.id,
                    batchNumber: dto.batchNumber ?? null,
                    initialQty: dto.quantity,
                    quantity: dto.quantity,
                    costPrice: dto.costPrice,
                    expiryDate: expiry,
                },
            });
        });
        return (0, response_helper_1.createResponse)(batch);
    }
    async consume(tx, p) {
        const product = await tx.product.findUnique({ where: { id: p.productId } });
        if (!product)
            throw new common_1.BadRequestException('Produk tidak ditemukan');
        if (!product.trackInventory)
            return;
        const inventory = await tx.inventory.findUnique({
            where: {
                productId_storeId: { productId: p.productId, storeId: p.storeId },
            },
        });
        if (!inventory) {
            throw new common_1.BadRequestException(`Stok ${product.name} belum tersedia`);
        }
        if (!product.hasExpiry) {
            if (inventory.quantity < p.quantity) {
                throw new common_1.BadRequestException(`Stok ${product.name} tidak cukup`);
            }
            await tx.inventory.update({
                where: { id: inventory.id },
                data: { quantity: { decrement: p.quantity } },
            });
            return;
        }
        const batches = await tx.inventoryBatch.findMany({
            where: {
                inventoryId: inventory.id,
                quantity: { gt: 0 },
                expiryDate: { gte: todayUtc() },
            },
            orderBy: { expiryDate: 'asc' },
        });
        let need = p.quantity;
        for (const b of batches) {
            if (need <= 0)
                break;
            const take = Math.min(b.quantity, need);
            await tx.inventoryBatch.update({
                where: { id: b.id },
                data: { quantity: { decrement: take } },
            });
            await tx.transactionItemBatch.create({
                data: {
                    transactionItemId: p.transactionItemId,
                    batchId: b.id,
                    quantity: take,
                },
            });
            need -= take;
        }
        if (need > 0) {
            throw new common_1.BadRequestException(`Stok ${product.name} tidak cukup (batch kedaluwarsa tidak dihitung)`);
        }
        await tx.inventory.update({
            where: { id: inventory.id },
            data: { quantity: { decrement: p.quantity } },
        });
    }
    async findExpiring(storeId, days = 30) {
        const limit = todayUtc();
        limit.setUTCDate(limit.getUTCDate() + days);
        const batches = await this.prisma.inventoryBatch.findMany({
            where: {
                quantity: { gt: 0 },
                expiryDate: { lte: limit },
                inventory: { storeId },
            },
            orderBy: { expiryDate: 'asc' },
            include: {
                inventory: {
                    select: { product: { select: { id: true, sku: true, name: true } } },
                },
            },
        });
        const today = todayUtc();
        return (0, response_helper_1.createResponse)(batches.map((b) => ({
            ...b,
            isExpired: b.expiryDate < today,
            daysLeft: Math.ceil((b.expiryDate.getTime() - today.getTime()) / 86_400_000),
        })));
    }
    async writeOffExpired(storeId, userId) {
        const result = await this.prisma.$transaction(async (tx) => {
            const expired = await tx.inventoryBatch.findMany({
                where: {
                    quantity: { gt: 0 },
                    expiryDate: { lt: todayUtc() },
                    inventory: { storeId },
                },
            });
            for (const b of expired) {
                await tx.stockAdjustment.create({
                    data: {
                        inventoryId: b.inventoryId,
                        userId,
                        quantityChange: -b.quantity,
                        type: 'EXPIRED',
                        reason: 'Kedaluwarsa',
                        notes: `Batch ${b.batchNumber ?? b.id}`,
                    },
                });
                await tx.inventory.update({
                    where: { id: b.inventoryId },
                    data: { quantity: { decrement: b.quantity } },
                });
                await tx.inventoryBatch.update({
                    where: { id: b.id },
                    data: { quantity: 0 },
                });
            }
            return { batches: expired.length };
        });
        return (0, response_helper_1.createResponse)(result);
    }
};
exports.InventoryBatchesService = InventoryBatchesService;
exports.InventoryBatchesService = InventoryBatchesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], InventoryBatchesService);
//# sourceMappingURL=inventory-batches.service.js.map