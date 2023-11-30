import {
  ArrayMaxSize,
  IsArray,
  IsDateString,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { INVOICE_TYPE_ENUM } from 'src/domain/enums';
import { IsValidDate } from 'src/domain/validators';

export class CreateInvoiceDto {
  @IsString({ each: true })
  @IsArray()
  @ArrayMaxSize(5)
  @Length(3, 1550, { each: true })
  @IsOptional()
  descriptions?: string[];

  @IsEnum(INVOICE_TYPE_ENUM)
  @IsNotEmpty()
  type: INVOICE_TYPE_ENUM;

  @IsInt()
  @IsNotEmpty()
  totalInstallment: number;

  @IsDateString()
  @IsNotEmpty()
  @IsValidDate()
  startingInstallmentIn: Date;

  @IsNumber()
  @IsNotEmpty()
  total: number;

  @IsNumber()
  @IsOptional()
  fees: number = 0;
}
