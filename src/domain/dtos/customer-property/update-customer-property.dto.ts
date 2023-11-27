import { PartialType } from '@nestjs/mapped-types';
import { CreateCustomerPropertyDto } from './create-customer-property.dto';

export class UpdateCustomerPropertyDto extends PartialType(
  CreateCustomerPropertyDto,
) {
  id?: string;
}
