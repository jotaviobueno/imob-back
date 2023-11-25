import { Module } from '@nestjs/common';
import { PersonModule } from './modules/person/person.module';
import { PrismaModule } from './db/prisma/prisma.module';
import { UserModule } from './modules/user/user.module';
import { S3Module } from './modules/s3/s3.module';

@Module({
  imports: [PersonModule, PrismaModule, UserModule, S3Module],
})
export class AppModule {}
