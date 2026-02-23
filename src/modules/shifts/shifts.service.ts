import { ConflictException, Injectable } from '@nestjs/common';
import { CreateShiftDto } from './dto/create-shift.dto';
import { UpdateShiftDto } from './dto/update-shift.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthUserInterface } from '../interfaces/auth-user.interface';

@Injectable()
export class ShiftsService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createShiftDto: CreateShiftDto, user: AuthUserInterface) {
    const userId = Number(user.userId);
    const existingShift = await this.prisma.shift.findFirst({
      where: { userId },
      orderBy: {
        createdAt: 'desc',
      },
    });

    if (existingShift?.status === 'OPEN') {
      throw new ConflictException({
        message:
          'Shift sebelumnya masih terbuka. Tutup shift dulu sebelum membuka yang baru.',
        existingShiftId: existingShift.id,
        status: existingShift.status,
      });
    }

    const newShift = await this.prisma.shift.create({
      data: {
        ...createShiftDto,
        userId,
        status: 'OPEN',
      },
    });

    return {
      message: 'Shift berhasil dibuka.',
      data: newShift,
    };
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
