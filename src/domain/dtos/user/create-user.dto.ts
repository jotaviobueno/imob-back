import { IsNotEmpty, IsString } from 'class-validator';
import { CreatePersonDto } from '../person';

export class CreateUserDto extends CreatePersonDto {
  @IsString()
  @IsNotEmpty()
  password: string;

  personId: string;

  avatar?: string;
}
