import { Module } from '@nestjs/common';
import { UserRealEstateService } from './user-real-estate.service';
import { UserRealEstateController } from './user-real-estate.controller';
import { UserModule } from '../user/user.module';
import { RealEstateModule } from '../real-estate/real-estate.module';
import { UserRealEstateRepository } from 'src/repositories/user-real-estate';

@Module({
  imports: [UserModule, RealEstateModule],
  controllers: [UserRealEstateController],
  providers: [UserRealEstateService, UserRealEstateRepository],
  exports: [UserRealEstateService],
})
export class UserRealEstateModule {}
