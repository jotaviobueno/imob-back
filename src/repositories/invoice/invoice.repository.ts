import { Injectable } from '@nestjs/common';
import { CreateInvoiceDto, UpdateInvoiceDto } from 'src/domain/dtos';
import { InvoiceEntity } from 'src/domain/entities';
import { RepositoryFactory } from 'src/domain/factories';

@Injectable()
export class InvoiceRepository extends RepositoryFactory<
  InvoiceEntity,
  CreateInvoiceDto,
  UpdateInvoiceDto
> {
  constructor() {
    super('invoice');
  }
}
