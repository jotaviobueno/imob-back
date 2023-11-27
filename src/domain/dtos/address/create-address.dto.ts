import {
  IsInt,
  IsNotEmpty,
  IsNumberString,
  IsString,
  Length,
} from 'class-validator';

export class CreateAddressDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 255)
  street: string;

  @IsNumberString()
  @IsNotEmpty()
  number: string;

  @IsString()
  @IsNotEmpty()
  @Length(3, 255)
  neighborhood: string;

  @IsString()
  @IsNotEmpty()
  @Length(3, 255)
  city: string;

  @IsInt()
  @IsNotEmpty()
  zipCode: number;

  @IsString()
  @IsNotEmpty()
  @Length(3, 255)
  state: string;
}
