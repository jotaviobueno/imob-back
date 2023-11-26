import { UserRealEstate } from '@prisma/client';

export class UserRealEstateEntity implements UserRealEstate {
  id: string;
  userId: string;
  realEstateId: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
