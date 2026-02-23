import {
  IsString,
  IsEmail,
  IsPhoneNumber,
  IsBoolean,
  IsOptional,
} from 'class-validator';
export class CreateStoreDto {
  @IsString()
  name: string;

  @IsString()
  address: string;

  @IsString()
  city: string;

  @IsPhoneNumber()
  phone: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
