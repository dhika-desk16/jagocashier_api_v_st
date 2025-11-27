import { Injectable } from '@nestjs/common';
import { CreatePromotionProductDto } from './dto/create-promotion-product.dto';
import { UpdatePromotionProductDto } from './dto/update-promotion-product.dto';
import { createResponse } from 'src/common/dto/response.helper';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PromotionProductsService {
  constructor(private prisma: PrismaService) {}
  async create(createPromotionProductDto: CreatePromotionProductDto) {
    const newPromotionProduct = await this.prisma.promotionProduct.create({
      data: createPromotionProductDto,
    });
    return createResponse(newPromotionProduct);
  }

  async findAll() {
    const promotionProducts = await this.prisma.promotionProduct.findMany();
    return createResponse(promotionProducts);
  }

  findOne(id: number) {
    return `This action returns a #${id} promotionProduct`;
  }

  update(id: number, updatePromotionProductDto: UpdatePromotionProductDto) {
    return `This action updates a #${id} promotionProduct`;
  }

  remove(id: number) {
    return `This action removes a #${id} promotionProduct`;
  }
}
