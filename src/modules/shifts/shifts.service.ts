import { ConflictException, Injectable } from '@nestjs/common';
import { CreateShiftDto } from './dto/create-shift.dto';
import { UpdateShiftDto } from './dto/update-shift.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthUserInterface } from '../interfaces/auth-user.interface';

@Injectable()
export class ShiftsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createShiftDto: CreateShiftDto, user: AuthUserInterface) {
    console.log('[SHIFT CREATE] Request diterima');
    console.log('[SHIFT CREATE] DTO:', createShiftDto);
    console.log('[SHIFT CREATE] User:', user);

    try {
      const userId = Number(user.userId);

      console.log('[SHIFT CREATE] Parsed userId:', userId);

      // 1. Periksa shift terakhir pengguna.
      console.log('[SHIFT CREATE] Mencari shift terakhir...');

      const existingShift = await this.prisma.shift.findFirst({
        where: { userId },
        orderBy: {
          createdAt: 'desc',
        },
      });

      console.log('[SHIFT CREATE] Existing shift:', existingShift);

      // 2. Tolak jika shift sebelumnya masih terbuka.
      if (existingShift?.status === 'OPEN') {
        console.warn('[SHIFT CREATE] Ditolak: shift sebelumnya masih OPEN');

        throw new ConflictException({
          message:
            'Shift sebelumnya masih terbuka. Tutup shift dulu sebelum membuka yang baru.',
          existingShiftId: existingShift.id,
          status: existingShift.status,
        });
      }

      // 3. Buat shift baru.
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
      // Pertahankan exception bisnis agar tetap menghasilkan status yang sesuai.
      if (error instanceof ConflictException) {
        throw error;
      }

      // Tampilkan detail error asli pada terminal backend.
      console.error('[SHIFT CREATE] GAGAL');
      console.error('[SHIFT CREATE] Error name:', error?.constructor?.name);
      console.error('[SHIFT CREATE] Error message:', error?.message);
      console.error('[SHIFT CREATE] Error code:', error?.code);
      console.error('[SHIFT CREATE] Full error:', error);

      // Lempar ulang agar mekanisme error handling NestJS tetap berjalan.
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
        // Sementara expectedCash diisi input user
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
