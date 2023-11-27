import { IsEnum, IsMongoId, IsNotEmpty } from 'class-validator';
import { CUSTOMER_PROPERTY_TYPE_ENUM } from 'src/domain/enums';

export class CreateCustomerPropertyDto {
  @IsEnum(CUSTOMER_PROPERTY_TYPE_ENUM)
  @IsNotEmpty()
  type: CUSTOMER_PROPERTY_TYPE_ENUM;

  @IsMongoId()
  @IsNotEmpty()
  propertyId: string;

  @IsMongoId()
  @IsNotEmpty()
  customerId: string;
}
