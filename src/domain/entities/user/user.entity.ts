import { User } from '@prisma/client';

export class UserEntity implements User {
  id: string;
  avatar: string | null;
  personId: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
