import { CUSTOMER_PROPERTY_TYPE, CustomerProperty } from '@prisma/client';

export class CustomerPropertyEntity implements CustomerProperty {
  id: string;
  type: CUSTOMER_PROPERTY_TYPE;
  propertyId: string;
  customerId: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
