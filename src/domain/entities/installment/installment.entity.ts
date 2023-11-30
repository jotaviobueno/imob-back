import { Installment, InvoiceStatus } from '@prisma/client';

export class InstallmentEntity implements Installment {
  id: string;
  descriptions: string[];
  status: InvoiceStatus;
  number: number;
  totalValueBeforeFees: number;
  value: string;
  invoiceId: string;
  paymentAt: Date | null;
  paymentLimitAt: Date;
  verifications: Date[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
