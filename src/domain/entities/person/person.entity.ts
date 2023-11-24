import { GENDER, Person } from '@prisma/client';

export class PersonEntity implements Person {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  cpf: string;
  rg: string | null;
  birthDate: Date;
  gender: GENDER;
  nationality: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
