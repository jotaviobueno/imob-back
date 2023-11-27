import { Module } from '@nestjs/common';
import { CustomerPropertyService } from './customer-property.service';
import { CustomerPropertyController } from './customer-property.controller';
import { CustomerPropertyRepository } from 'src/repositories/customer-property';
import { PropertyModule } from '../property/property.module';
import { CustomerModule } from '../customer/customer.module';

@Module({
  imports: [PropertyModule, CustomerModule],
  controllers: [CustomerPropertyController],
  providers: [CustomerPropertyService, CustomerPropertyRepository],
  exports: [CustomerPropertyService],
})
export class CustomerPropertyModule {}
