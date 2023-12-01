import { PROPERTY_STATUS, PROPERTY_TYPE, Property } from '@prisma/client';

export class PropertyEntity implements Property {
  id: string;
  description: string;
  isActive: boolean;
  type: PROPERTY_TYPE;
  status: PROPERTY_STATUS;
  saleValue: number | null;
  rentalValue: number | null;
  buildingArea: string;
  landArea: string;
  images: string[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  addressId: string;
  realEstateId: string;
}
