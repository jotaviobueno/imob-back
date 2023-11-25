import { Module } from '@nestjs/common';
import { RealEstateService } from './real-estate.service';
import { RealEstateController } from './real-estate.controller';
import { RealEstateRepository } from 'src/repositories/real-estate';
import { S3Module } from '../s3/s3.module';
import { AddressModule } from '../address/address.module';

@Module({
  imports: [S3Module, AddressModule],
  controllers: [RealEstateController],
  providers: [RealEstateService, RealEstateRepository],
  exports: [RealEstateService],
})
export class RealEstateModule {}
