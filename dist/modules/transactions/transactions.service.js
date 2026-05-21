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
exports.TransactionsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const library_1 = require("@prisma/client/runtime/library");
const response_helper_1 = require("../../common/dto/response.helper");
let TransactionsService = class TransactionsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto, id) {
        return this.prisma.$transaction(async (tx) => {
            try {
                const user = await tx.user.findUnique({
                    where: { id },
                    include: {
                        store: true,
                        shifts: {
                            where: {
                                status: 'OPEN',
                            },
                            orderBy: {
                                openedAt: 'desc',
                            },
                            take: 1,
                        },
                    },
                });
                if (!user) {
                    throw new common_1.BadRequestException('User tidak ditemukan');
                }
                const activeShift = user.shifts[0];
                if (!activeShift) {
                    throw new common_1.ConflictException('Tidak ada shift aktif');
                }
                const transactionCode = `TRX-${Date.now()}`;
                const itemsPayload = [];
                let subtotal = new library_1.Decimal(0);
                for (const item of dto.items) {
                    const product = await tx.product.findUnique({
                        where: { id: item.productId },
                    });
                    if (!product || !product.isActive) {
                        throw new common_1.BadRequestException(`Product ${item.productId} tidak tersedia`);
                    }
                    let unitPrice = product.basePrice;
                    if (item.variantId) {
                        const variant = await tx.productVariant.findUnique({
                            where: { id: item.variantId },
                        });
                        if (!variant || !variant.isActive) {
                            throw new common_1.BadRequestException(`Variant ${item.variantId} tidak tersedia`);
                        }
                        unitPrice = unitPrice.plus(variant.priceAdjustment);
                    }
                    const qty = new library_1.Decimal(item.quantity);
                    const price = new library_1.Decimal(unitPrice);
                    const discount = new library_1.Decimal(item.discountAmount ?? 0);
                    const itemSubtotal = price.mul(qty).minus(discount);
                    if (itemSubtotal.lessThan(0)) {
                        throw new common_1.BadRequestException('Subtotal item tidak valid');
                    }
                    subtotal = subtotal.plus(itemSubtotal);
                    itemsPayload.push({
                        productId: item.productId,
                        variantId: item.variantId ?? null,
                        quantity: item.quantity,
                        unitPrice: price,
                        discountAmount: discount,
                        subtotal: itemSubtotal,
                        notes: item.notes,
                    });
                }
                const taxRate = new library_1.Decimal(dto.taxRate ?? 0);
                const taxAmount = subtotal.mul(taxRate);
                const totalAmount = subtotal.plus(taxAmount);
                const transaction = await tx.transaction.create({
                    data: {
                        code: transactionCode,
                        storeId: user.storeId,
                        shiftId: activeShift.id,
                        userId: user.id,
                        customerId: dto.customerId ?? null,
                        subtotal,
                        discountAmount: new library_1.Decimal(0),
                        taxAmount,
                        totalAmount,
                        status: 'PAID',
                        transactionDate: new Date(),
                        items: {
                            create: itemsPayload.map((item) => ({
                                ...item,
                            })),
                        },
                    },
                    include: {
                        items: true,
                    },
                });
                return transaction;
            }
            catch (err) {
                console.error('PRISMA ERROR RAW:', err);
                console.error('PRISMA ERROR MESSAGE:', err?.message);
                console.error('PRISMA ERROR META:', err?.meta);
                throw err;
            }
        });
    }
    async findAll() {
        const transaction = await this.prisma.transaction.findMany();
        return (0, response_helper_1.createResponse)(transaction);
    }
    findOne(id) {
        return `This action returns a #${id} transaction`;
    }
    update(id, updateTransactionDto) {
        return `This action updates a #${id} transaction`;
    }
    remove(id) {
        return `This action removes a #${id} transaction`;
    }
};
exports.TransactionsService = TransactionsService;
exports.TransactionsService = TransactionsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TransactionsService);
//# sourceMappingURL=transactions.service.js.map