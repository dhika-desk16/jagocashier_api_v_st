import { Module } from '@nestjs/common';
import { PromotionProductsService } from './promotion-products.service';
import { PromotionProductsController } from './promotion-products.controller';

@Module({
  controllers: [PromotionProductsController],
  providers: [PromotionProductsService],
})
export class PromotionProductsModule {}
