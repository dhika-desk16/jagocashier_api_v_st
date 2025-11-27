import { Injectable } from '@nestjs/common';
import { CreateLoyaltyTransactionDto } from './dto/create-loyalty-transaction.dto';
import { UpdateLoyaltyTransactionDto } from './dto/update-loyalty-transaction.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { createResponse } from 'src/common/dto/response.helper';

@Injectable()
export class LoyaltyTransactionsService {
  constructor(private prisma: PrismaService) {}
  create(createLoyaltyTransactionDto: CreateLoyaltyTransactionDto) {
    return 'This action adds a new loyaltyTransaction';
  }

  async findAll() {
    const loyaltyTransactions = await this.prisma.loyaltyTransaction.findMany();
    return createResponse(loyaltyTransactions);
  }

  findOne(id: number) {
    return `This action returns a #${id} loyaltyTransaction`;
  }

  update(id: number, updateLoyaltyTransactionDto: UpdateLoyaltyTransactionDto) {
    return `This action updates a #${id} loyaltyTransaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} loyaltyTransaction`;
  }
}
