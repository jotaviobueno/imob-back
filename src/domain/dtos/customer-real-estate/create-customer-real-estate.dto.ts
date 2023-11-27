import { IsMongoId, IsNotEmpty } from 'class-validator';

export class CreateCustomerRealEstateDto {
  @IsMongoId()
  @IsNotEmpty()
  customerId: string;

  @IsMongoId()
  @IsNotEmpty()
  realEstateId: string;
}
