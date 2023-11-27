import { Module } from '@nestjs/common';
import { CustomerRealEstateService } from './customer-real-estate.service';
import { CustomerRealEstateController } from './customer-real-estate.controller';
import { CustomerRealEstateRepository } from 'src/repositories/customer-real-estate';
import { CustomerModule } from '../customer/customer.module';
import { RealEstateModule } from '../real-estate/real-estate.module';

@Module({
  imports: [CustomerModule, RealEstateModule],
  controllers: [CustomerRealEstateController],
  providers: [CustomerRealEstateService, CustomerRealEstateRepository],
  exports: [CustomerRealEstateService],
})
export class CustomerRealEstateModule {}
