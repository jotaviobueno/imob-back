import { PERSON_TYPE } from '@prisma/client';
import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
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

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsCpf()
  @IsNotEmpty()
  cpf: string;

  @IsString()
  @IsNotEmpty()
  rg?: string;

  @IsDateString()
  @IsNotEmpty()
  birthDate: Date;

  @IsEnum(PERSON_GENDER)
  @IsNotEmpty()
  gender: PERSON_GENDER;

  @IsString()
  @Length(3, 255)
  @IsNotEmpty()
  nationality?: string;

  type: PERSON_TYPE;
}
