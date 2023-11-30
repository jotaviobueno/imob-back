import { Invoice, InvoiceType } from '@prisma/client';

export class InvoiceEntity implements Invoice {
  id: string;
  descriptions: string[];
  type: InvoiceType;
  totalInstallment: number;
  startingInstallmentIn: Date;
  total: number;
  fees: number | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
