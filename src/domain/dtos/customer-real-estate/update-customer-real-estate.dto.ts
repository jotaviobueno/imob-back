import { PartialType } from '@nestjs/mapped-types';
import { CreateCustomerRealEstateDto } from './create-customer-real-estate.dto';

export class UpdateCustomerRealEstateDto extends PartialType(
  CreateCustomerRealEstateDto,
) {
  id?: string;
}
