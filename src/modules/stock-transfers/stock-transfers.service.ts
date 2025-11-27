import { Injectable } from '@nestjs/common';
import { CreateStockTransferDto } from './dto/create-stock-transfer.dto';
import { UpdateStockTransferDto } from './dto/update-stock-transfer.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { createResponse } from 'src/common/dto/response.helper';

@Injectable()
export class StockTransfersService {
  constructor(private prisma: PrismaService) {}
  create(createStockTransferDto: CreateStockTransferDto) {
    return 'This action adds a new stockTransfer';
  }

  async findAll() {
    const stockTransfers = await this.prisma.stockTransfer.findMany();
    return createResponse(stockTransfers);
  }

  findOne(id: number) {
    return `This action returns a #${id} stockTransfer`;
  }

  update(id: number, updateStockTransferDto: UpdateStockTransferDto) {
    return `This action updates a #${id} stockTransfer`;
  }

  remove(id: number) {
    return `This action removes a #${id} stockTransfer`;
  }
}
