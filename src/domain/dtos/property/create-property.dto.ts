import {
  IsBoolean,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { PROPERTY_STATUS_ENUM } from 'src/domain/enums';

export class CreatePropertyDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 1550)
  description: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @IsEnum(PROPERTY_STATUS_ENUM)
  @IsNotEmpty()
  status: PROPERTY_STATUS_ENUM;

  @IsNumber()
  @IsOptional()
  saleValue: number | null;

  @IsNumber()
  @IsOptional()
  rentalValue: number | null;

  @IsString()
  @IsNotEmpty()
  buildingArea: string;

  @IsString()
  @IsNotEmpty()
  landArea: string;

  @IsMongoId()
  @IsNotEmpty()
  addressId: string;

  @IsMongoId()
  @IsNotEmpty()
  typeId: string;

  @IsMongoId()
  @IsNotEmpty()
  realEstateId: string;

  images: string[];
}
