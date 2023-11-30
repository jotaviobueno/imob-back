import { Injectable } from '@nestjs/common';
import { ServiceBase } from 'src/domain/bases';
import { CreateInvoiceDto, UpdateInvoiceDto } from 'src/domain/dtos';
import { InvoiceEntity } from 'src/domain/entities';
import { InvoiceCalculator } from 'src/domain/utils/invoice';
import { InvoiceRepository } from 'src/repositories/invoice';

@Injectable()
export class InvoiceService
  implements
    Partial<ServiceBase<InvoiceEntity, CreateInvoiceDto, UpdateInvoiceDto>>
{
  constructor(private readonly invoiceRepository: InvoiceRepository) {}

  async create(dto: CreateInvoiceDto): Promise<InvoiceEntity> {
    const { installments, total } = new InvoiceCalculator(dto).handle();

    const invoice = await this.invoiceRepository.create({
      total,
      ...dto,
    });

    return invoice;
  }
}
