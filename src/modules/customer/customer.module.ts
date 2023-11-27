import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { CustomerRepository } from 'src/repositories/customer';
import { AddressModule } from '../address/address.module';
import { PersonModule } from '../person/person.module';

@Module({
  imports: [AddressModule, PersonModule],
  controllers: [CustomerController],
  providers: [CustomerService, CustomerRepository],
  exports: [CustomerService],
})
export class CustomerModule {}
