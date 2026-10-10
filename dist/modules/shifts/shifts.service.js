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
exports.ShiftsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let ShiftsService = class ShiftsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createShiftDto, user) {
        console.log('[SHIFT CREATE] Request diterima');
        console.log('[SHIFT CREATE] DTO:', createShiftDto);
        console.log('[SHIFT CREATE] User:', user);
        try {
            const userId = Number(user.userId);
            console.log('[SHIFT CREATE] Parsed userId:', userId);
            console.log('[SHIFT CREATE] Mencari shift terakhir...');
            const existingShift = await this.prisma.shift.findFirst({
                where: { userId },
                orderBy: {
                    createdAt: 'desc',
                },
            });
            console.log('[SHIFT CREATE] Existing shift:', existingShift);
            if (existingShift?.status === 'OPEN') {
                console.warn('[SHIFT CREATE] Ditolak: shift sebelumnya masih OPEN');
                throw new common_1.ConflictException({
                    message: 'Shift sebelumnya masih terbuka. Tutup shift dulu sebelum membuka yang baru.',
                    existingShiftId: existingShift.id,
                    status: existingShift.status,
                });
            }
            console.log('[SHIFT CREATE] Membuat shift baru...');
            const newShift = await this.prisma.shift.create({
                data: {
                    ...createShiftDto,
                    userId,
                    status: 'OPEN',
                },
            });
            console.log('[SHIFT CREATE] Shift berhasil dibuat:', newShift);
            return {
                message: 'Shift berhasil dibuka.',
                data: newShift,
            };
        }
        catch (error) {
            if (error instanceof common_1.ConflictException) {
                throw error;
            }
            console.error('[SHIFT CREATE] GAGAL');
            console.error('[SHIFT CREATE] Error name:', error?.constructor?.name);
            console.error('[SHIFT CREATE] Error message:', error?.message);
            console.error('[SHIFT CREATE] Error code:', error?.code);
            console.error('[SHIFT CREATE] Full error:', error);
            throw error;
        }
    }
    async closeShift(id, closeShiftDto, user) {
        const userId = Number(user.userId);
        const shift = await this.prisma.shift.findUnique({
            where: { id },
        });
        if (!shift) {
            throw new common_1.ConflictException('Shift not found.');
        }
        if (shift.status === 'CLOSED') {
            throw new common_1.ConflictException('Shift already closed.');
        }
        const variance = closeShiftDto.closingCash - closeShiftDto.expectedCash;
        const updatedShift = await this.prisma.shift.update({
            where: { id },
            data: {
                closingCash: closeShiftDto.closingCash,
                expectedCash: closeShiftDto.expectedCash,
                variance,
                closedAt: new Date(),
                status: 'CLOSED',
                userId,
            },
        });
        return {
            message: 'Shift berhasil ditutup.',
            data: updatedShift,
        };
    }
    findAll() {
        return this.prisma.shift.findMany();
    }
    findOne(id) {
        return `This action returns a #${id} shift`;
    }
    update(id, updateShiftDto) {
        return `This action updates a #${id} shift`;
    }
    remove(id) {
        return `This action removes a #${id} shift`;
    }
};
exports.ShiftsService = ShiftsService;
exports.ShiftsService = ShiftsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ShiftsService);
//# sourceMappingURL=shifts.service.js.map