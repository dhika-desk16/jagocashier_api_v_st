import { Injectable } from '@nestjs/common';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { createResponse } from 'src/common/dto/response.helper';
import { generateCode } from 'src/common/utils/generateCode';

@Injectable()
export class StoresService {
  constructor(private prisma: PrismaService) {}
  async create(dto: CreateStoreDto) {
    const code = new generateCode('STR').tag('JKT');
    const store = await this.prisma.store.create({
      data: {
        code,
        ...dto,
      },
    });

    return createResponse(store);
  }

  async findAll() {
    const stores = await this.prisma.store.findMany();
    return createResponse(stores);
  }

  findOne(id: number) {
    return `This action returns a #${id} store`;
  }

  update(id: number, updateStoreDto: UpdateStoreDto) {
    return `This action updates a #${id} store`;
  }

  remove(id: number) {
    return `This action removes a #${id} store`;
  }
}
