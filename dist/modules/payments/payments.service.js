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
exports.PaymentsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const response_helper_1 = require("../../common/dto/response.helper");
const prisma_1 = require("../../../generated/prisma/index.js");
const Decimal = prisma_1.Prisma.Decimal;
let PaymentsService = class PaymentsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(transactionId, dto) {
        const result = await this.prisma.$transaction(async (tx) => {
            await tx.$queryRaw `SELECT id FROM transactions WHERE id = ${transactionId} FOR UPDATE`;
            const trx = await tx.transaction.findUnique({
                where: { id: transactionId },
                include: { receivable: true },
            });
            if (!trx)
                throw new common_1.NotFoundException('Transaksi tidak ditemukan');
            if (trx.status === 'PAID' || trx.status === 'CANCELLED') {
                throw new common_1.ConflictException(`Transaksi sudah ${trx.status}`);
            }
            const agg = await tx.payment.aggregate({
                where: { transactionId, status: 'SUCCESS' },
                _sum: { amount: true },
            });
            let remaining = trx.totalAmount.minus(agg._sum.amount ?? 0);
            if (remaining.lte(0))
                throw new common_1.ConflictException('Tagihan sudah lunas');
            let change = new Decimal(0);
            const now = new Date();
            for (const line of dto.payments) {
                const method = await tx.paymentMethod.findUnique({
                    where: { id: line.paymentMethodId },
                });
                if (!method || !method.isActive) {
                    throw new common_1.BadRequestException(`Metode pembayaran ${line.paymentMethodId} tidak tersedia`);
                }
                if (remaining.lte(0)) {
                    throw new common_1.BadRequestException('Tagihan sudah terbayar penuh, hapus baris pembayaran berlebih');
                }
                const given = new Decimal(line.amount);
                const isCash = method.type === 'CASH';
                if (!isCash && given.gt(remaining)) {
                    throw new common_1.BadRequestException(`Nominal ${method.name} melebihi sisa tagihan`);
                }
                const applied = given.gt(remaining) ? remaining : given;
                const lineChange = given.minus(applied);
                remaining = remaining.minus(applied);
                change = change.plus(lineChange);
                await tx.payment.create({
                    data: {
                        transactionId,
                        paymentMethodId: method.id,
                        amount: applied,
                        status: 'SUCCESS',
                        referenceNumber: line.referenceNumber ?? null,
                        paymentDate: now,
                        notes: lineChange.gt(0)
                            ? `Diterima ${given.toFixed(0)}, kembalian ${lineChange.toFixed(0)}`
                            : (line.notes ?? null),
                    },
                });
            }
            const paid = trx.totalAmount.minus(remaining);
            let status;
            if (remaining.lte(0)) {
                status = 'PAID';
                if (trx.receivable) {
                    await tx.receivable.update({
                        where: { id: trx.receivable.id },
                        data: { amountDue: new Decimal(0), status: 'PAID' },
                    });
                }
            }
            else {
                if (!trx.customerId) {
                    throw new common_1.BadRequestException('Pembayaran kurang. Pilih pelanggan untuk mencatat piutang');
                }
                status = paid.gt(0) ? 'PARTIAL' : 'PENDING';
                if (trx.receivable) {
                    await tx.receivable.update({
                        where: { id: trx.receivable.id },
                        data: {
                            amountDue: remaining,
                            ...(dto.dueDate && { dueDate: new Date(dto.dueDate) }),
                        },
                    });
                }
                else {
                    if (!dto.dueDate) {
                        throw new common_1.BadRequestException('dueDate wajib diisi untuk piutang baru');
                    }
                    await tx.receivable.create({
                        data: {
                            transactionId,
                            customerId: trx.customerId,
                            amountDue: remaining,
                            dueDate: new Date(dto.dueDate),
                        },
                    });
                }
            }
            await tx.transaction.update({
                where: { id: transactionId },
                data: { status },
            });
            return {
                transactionId,
                status,
                totalAmount: trx.totalAmount,
                paid,
                remaining,
                change,
            };
        });
        return (0, response_helper_1.createResponse)(result);
    }
    async findAll() {
        const payments = await this.prisma.payment.findMany();
        return (0, response_helper_1.createResponse)(payments);
    }
};
exports.PaymentsService = PaymentsService;
exports.PaymentsService = PaymentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PaymentsService);
//# sourceMappingURL=payments.service.js.map