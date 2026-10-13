import { Type } from 'class-transformer';
import {
  IsArray,
  IsDateString,
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  ValidateNested,
} from 'class-validator';

export class PaymentLineDto {
  @IsInt()
  paymentMethodId: number;

  @IsNumber()
  @IsPositive()
  amount: number;

  @IsOptional()
  @IsString()
  referenceNumber?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}

export class CreatePaymentDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PaymentLineDto)
  payments: PaymentLineDto[];

  @IsOptional()
  @IsDateString()
  dueDate?: string;
}