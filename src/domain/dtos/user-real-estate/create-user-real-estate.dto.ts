import { IsMongoId, IsNotEmpty } from 'class-validator';

export class CreateUserRealEstateDto {
  @IsMongoId()
  @IsNotEmpty()
  userId: string;

  @IsMongoId()
  @IsNotEmpty()
  realEstateId: string;
}
