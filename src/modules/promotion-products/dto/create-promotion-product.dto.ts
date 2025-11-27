import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreatePromotionProductDto {
  @IsNotEmpty()
  @IsNumber()
  promotionId: number;
  @IsOptional()
  @IsNumber()
  productId?: number;
  @IsOptional()
  @IsNumber()
  categoryId?: number;
}
