import {
  IsEmpty,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateShiftDto {
  @IsNotEmpty()
  @IsNumber()
  storeId: number;

  @IsNotEmpty()
  @IsNumber()
  openingCash: number;

  @IsOptional()
  @IsNumber()
  closingCash?: number;

  @IsOptional()
  @IsNumber()
  expectedCash?: number;

  @IsOptional()
  @IsNumber()
  variance?: number;
}
