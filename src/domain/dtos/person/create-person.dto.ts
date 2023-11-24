import {
  IsDate,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  Length,
} from 'class-validator';
import { PERSON_GENDER } from 'src/domain/enums';
import { IsCpf } from 'src/domain/validators';

export class CreatePersonDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 255)
  fullName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsPhoneNumber()
  @IsNotEmpty()
  phone: string;

  @IsCpf()
  @IsNotEmpty()
  cpf: string;

  @IsString()
  @IsNotEmpty()
  rg?: string;

  @IsDate()
  @IsNotEmpty()
  birthDate: Date;

  @IsEnum(PERSON_GENDER)
  @IsNotEmpty()
  gender: PERSON_GENDER;

  @IsString()
  @Length(3, 255)
  @IsNotEmpty()
  nationality?: string;
}
