import { CustomerRealEstate } from '@prisma/client';

export class CustomerRealEstateEntity implements CustomerRealEstate {
  id: string;
  realEstateId: string;
  customerId: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
