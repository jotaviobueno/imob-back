import { Customer } from '@prisma/client';

export class CustomerEntity implements Customer {
  id: string;
  personId: string;
  addressId: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
