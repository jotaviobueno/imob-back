import { IsMongoId, IsNotEmpty } from 'class-validator';
import { CreatePersonDto } from '../person';

export class CreateCustomerDto extends CreatePersonDto {
  @IsMongoId()
  @IsNotEmpty()
  addressId: string;

  personId: string;
}
