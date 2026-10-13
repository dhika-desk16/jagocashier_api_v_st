import { ConflictException, Injectable } from '@nestjs/common';
import { CreateShiftDto } from './dto/create-shift.dto';
import { UpdateShiftDto } from './dto/update-shift.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthUserInterface } from '../interfaces/auth-user.interface';

@Injectable()
export class ShiftsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createShiftDto: CreateShiftDto, user: AuthUserInterface) {
    try {
      const userId = Number(user.userId);

      const existingShift = await this.prisma.shift.findFirst({
        where: { userId },
        orderBy: {
          createdAt: 'desc',
        },
      });

      if (existingShift?.status === 'OPEN') {
        console.warn('[SHIFT CREATE] Ditolak: shift sebelumnya masih OPEN');

        throw new ConflictException({
          message:
            'Shift sebelumnya masih terbuka. Tutup shift dulu sebelum membuka yang baru.',
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
    } catch (error) {
      if (error instanceof ConflictException) {
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

  async closeShift(id: number, closeShiftDto: any, user: AuthUserInterface) {
    const userId = Number(user.userId);
    const shift = await this.prisma.shift.findUnique({
      where: { id },
    });

    if (!shift) {
      throw new ConflictException('Shift not found.');
    }

    if (shift.status === 'CLOSED') {
      throw new ConflictException('Shift already closed.');
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

  findOne(id: number) {
    return `This action returns a #${id} shift`;
  }

  update(id: number, updateShiftDto: UpdateShiftDto) {
    return `This action updates a #${id} shift`;
  }

  remove(id: number) {
    return `This action removes a #${id} shift`;
  }
}
