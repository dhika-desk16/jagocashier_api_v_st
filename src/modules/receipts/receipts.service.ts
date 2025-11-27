import { Injectable } from '@nestjs/common';
import { CreateReceiptDto } from './dto/create-receipt.dto';
import { UpdateReceiptDto } from './dto/update-receipt.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { createResponse } from 'src/common/dto/response.helper';

@Injectable()
export class ReceiptsService {
  constructor(private prisma: PrismaService) {}
  create(createReceiptDto: CreateReceiptDto) {
    return 'This action adds a new receipt';
  }

  async findAll() {
    const receipts = await this.prisma.receipt.findMany();
    return createResponse(receipts);
  }

  findOne(id: number) {
    return `This action returns a #${id} receipt`;
  }

  update(id: number, updateReceiptDto: UpdateReceiptDto) {
    return `This action updates a #${id} receipt`;
  }

  remove(id: number) {
    return `This action removes a #${id} receipt`;
  }
}
