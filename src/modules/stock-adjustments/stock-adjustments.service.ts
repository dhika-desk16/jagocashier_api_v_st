import { Injectable } from '@nestjs/common';
import { CreateStockAdjustmentDto } from './dto/create-stock-adjustment.dto';
import { UpdateStockAdjustmentDto } from './dto/update-stock-adjustment.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { createResponse } from 'src/common/dto/response.helper';

@Injectable()
export class StockAdjustmentsService {
  constructor(private prisma: PrismaService) {}
  create(createStockAdjustmentDto: CreateStockAdjustmentDto) {
    return 'This action adds a new stockAdjustment';
  }

  async findAll() {
    const stockAdjustments = await this.prisma.stockAdjustment.findMany();
    return createResponse(stockAdjustments);
  }

  findOne(id: number) {
    return `This action returns a #${id} stockAdjustment`;
  }

  update(id: number, updateStockAdjustmentDto: UpdateStockAdjustmentDto) {
    return `This action updates a #${id} stockAdjustment`;
  }

  remove(id: number) {
    return `This action removes a #${id} stockAdjustment`;
  }
}
