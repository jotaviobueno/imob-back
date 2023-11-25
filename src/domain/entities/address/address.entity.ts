import { Address } from '@prisma/client';

export class AddressEntity implements Address {
  id: string;
  street: string;
  number: string;
  neighborhood: string;
  city: string;
  zipCode: number;
  state: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
