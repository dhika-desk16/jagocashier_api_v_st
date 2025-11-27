import { Injectable } from '@nestjs/common';
import { CreateLoyaltyPointDto } from './dto/create-loyalty-point.dto';
import { UpdateLoyaltyPointDto } from './dto/update-loyalty-point.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { createResponse } from 'src/common/dto/response.helper';

@Injectable()
export class LoyaltyPointsService {
  constructor(private prisma: PrismaService) {}
  create(createLoyaltyPointDto: CreateLoyaltyPointDto) {
    return 'This action adds a new loyaltyPoint';
  }

  async findAll() {
    const loyaltyPoints = await this.prisma.loyaltyPoint.findMany();
    return createResponse(loyaltyPoints);
  }

  findOne(id: number) {
    return `This action returns a #${id} loyaltyPoint`;
  }

  update(id: number, updateLoyaltyPointDto: UpdateLoyaltyPointDto) {
    return `This action updates a #${id} loyaltyPoint`;
  }

  remove(id: number) {
    return `This action removes a #${id} loyaltyPoint`;
  }
}
