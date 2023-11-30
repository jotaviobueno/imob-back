import { CreateInvoiceDto } from 'src/domain/dtos';

export class InvoiceCalculator {
  private installments: { value: number; date: Date }[] = [];
  private total: number;

  constructor(private readonly dto: CreateInvoiceDto) {
    this.total = dto.total;

    this.getTotal();
    this.getInstallments();
  }

  private getTotal() {
    this.total = this.dto.total + this.dto.fees;
  }

  private getInstallments() {
    for (let index = 0; index < this.dto.totalInstallment; index++) {
      this.installments.push({
        value: this.total / this.dto.totalInstallment,
        date,
      });
    }
  }

  handle() {
    return {
      total: this.total,
      installments: this.installments,
    };
  }
}
