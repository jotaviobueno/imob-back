import { Module } from '@nestjs/common';
import { PersonModule } from './modules/person/person.module';
import { PrismaModule } from './db/prisma/prisma.module';
import { UserModule } from './modules/user/user.module';
import { S3Module } from './modules/s3/s3.module';
import { RealEstateModule } from './modules/real-estate/real-estate.module';
import { AddressModule } from './modules/address/address.module';
import { RoleModule } from './modules/role/role.module';
import { UserRoleModule } from './modules/user-role/user-role.module';
import { APP_GUARD } from '@nestjs/core';
import { AccessGuard } from './modules/access/guards';
import { AccessModule } from './modules/access/access.module';
import { UserRealEstateModule } from './modules/user-real-estate/user-real-estate.module';
import { MenuModule } from './modules/menu/menu.module';
import { CustomerModule } from './modules/customer/customer.module';
import { CustomerRealEstateModule } from './modules/customer-real-estate/customer-real-estate.module';
import { PropertyModule } from './modules/property/property.module';
import { CustomerPropertyModule } from './modules/customer-property/customer-property.module';

@Module({
  imports: [
    PersonModule,
    PrismaModule,
    UserModule,
    S3Module,
    RealEstateModule,
    AddressModule,
    RoleModule,
    UserRoleModule,
    AccessModule,
    UserRealEstateModule,
    MenuModule,
    CustomerModule,
    CustomerRealEstateModule,
    PropertyModule,
    CustomerPropertyModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AccessGuard,
    },
  ],
})
export class AppModule {}
