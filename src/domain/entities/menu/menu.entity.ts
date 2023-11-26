import { Menu } from '@prisma/client';

export class MenuEntity implements Menu {
  id: string;
  name: string;
  url: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
