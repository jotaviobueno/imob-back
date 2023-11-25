import {
  ArrayMaxSize,
  IsArray,
  IsMongoId,
  IsNotEmpty,
  IsString,
  Length,
} from 'class-validator';
import { IsCnpj } from 'src/domain/validators';

export class CreateRealEstateDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsCnpj()
  @IsNotEmpty()
  cnpj: string;

  @IsMongoId()
  @IsNotEmpty()
  addressId: string;

  @IsString({ each: true })
  @IsNotEmpty()
  @IsArray()
  @ArrayMaxSize(3)
  @Length(3, 1500, { each: true })
  descriptions: string[];

  images: string[];
}
