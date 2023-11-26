import { IsMongoId, IsNotEmpty } from 'class-validator';

export class UserRoleDto {
  @IsMongoId()
  @IsNotEmpty()
  userId: string;

  @IsMongoId()
  @IsNotEmpty()
  roleId: string;
}
