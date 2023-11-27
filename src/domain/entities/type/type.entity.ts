import { Type } from '@prisma/client';

export class TypeEntity implements Type {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
