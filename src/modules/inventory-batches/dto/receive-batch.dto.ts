import {
  IsDateString,
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class ReceiveBatchDto {
  @IsInt()
  storeId: number;

  @IsInt()
  productId: number;

  @IsOptional()
  @IsString()
  batchNumber?: string;

  @IsInt()
  @IsPositive()
  quantity: number;

  @IsNumber()
  @IsPositive()
  costPrice: number;

  @IsDateString()
  expiryDate: string;
}
