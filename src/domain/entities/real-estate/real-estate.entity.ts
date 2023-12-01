import { RealEstate } from '@prisma/client';

export class RealEstateEntity implements RealEstate {
  id: string;
  name: string;
  cnpj: string;
  addressId: string | null;
  descriptions: string[];
  images: string[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
