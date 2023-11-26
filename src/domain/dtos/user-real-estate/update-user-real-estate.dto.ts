import { PartialType } from '@nestjs/mapped-types';
import { CreateUserRealEstateDto } from './create-user-real-estate.dto';

export class UpdateUserRealEstateDto extends PartialType(
  CreateUserRealEstateDto,
) {
  id?: string;
}
