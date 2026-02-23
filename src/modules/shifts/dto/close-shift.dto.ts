import { IsNotEmpty, IsNumber } from 'class-validator';

export class CloseShiftDto {
  @IsNotEmpty()
  @IsNumber()
  closingCash: number;

  @IsNotEmpty()
  @IsNumber()
  expectedCash: number;
}
