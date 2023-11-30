import { Module } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { InvoiceController } from './invoice.controller';
import { InvoiceRepository } from 'src/repositories/invoice';

@Module({
  controllers: [InvoiceController],
  providers: [InvoiceService, InvoiceRepository],
})
export class InvoiceModule {}
