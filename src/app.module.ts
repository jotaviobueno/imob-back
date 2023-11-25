import { Module } from '@nestjs/common';
import { PersonModule } from './modules/person/person.module';
import { PrismaModule } from './db/prisma/prisma.module';
import { UserModule } from './modules/user/user.module';
import { S3Module } from './modules/s3/s3.module';
import { RealEstateModule } from './modules/real-estate/real-estate.module';
import { AddressModule } from './modules/address/address.module';

@Module({
  imports: [PersonModule, PrismaModule, UserModule, S3Module, RealEstateModule, AddressModule],
})
export class AppModule {}
