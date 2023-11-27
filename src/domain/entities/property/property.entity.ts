import { PROPERTY_STATUS, Property } from '@prisma/client';

export class PropertyEntity implements Property {
  id: string;
  description: string;
  isActive: boolean;
  status: PROPERTY_STATUS;
  saleValue: number | null;
  rentalValue: number | null;
  buildingArea: string;
  landArea: string;
  images: string[];
  addressId: string;
  typeId: string;
  realEstateId: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
