import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PromotionProductsService } from './promotion-products.service';
import { CreatePromotionProductDto } from './dto/create-promotion-product.dto';
import { UpdatePromotionProductDto } from './dto/update-promotion-product.dto';

@Controller('promotion-products')
export class PromotionProductsController {
  constructor(private readonly promotionProductsService: PromotionProductsService) {}

  @Post()
  create(@Body() createPromotionProductDto: CreatePromotionProductDto) {
    return this.promotionProductsService.create(createPromotionProductDto);
  }

  @Get()
  findAll() {
    return this.promotionProductsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.promotionProductsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePromotionProductDto: UpdatePromotionProductDto) {
    return this.promotionProductsService.update(+id, updatePromotionProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.promotionProductsService.remove(+id);
  }
}
