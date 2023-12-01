import { Module } from '@nestjs/common';
import { PropertyService } from './property.service';
import { PropertyController } from './property.controller';
import { AddressModule } from '../address/address.module';
import { RealEstateModule } from '../real-estate/real-estate.module';
import { PropertyRepository } from 'src/repositories/property';
import { S3Module } from '../s3/s3.module';

@Module({
  imports: [AddressModule, RealEstateModule, S3Module],
  controllers: [PropertyController],
  providers: [PropertyService, PropertyRepository],
  exports: [PropertyService],
})
export class PropertyModule {}
