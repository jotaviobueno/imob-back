import { Module } from '@nestjs/common';
import { PersonModule } from './modules/person/person.module';
import { PrismaModule } from './db/prisma.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [PersonModule, PrismaModule, UserModule],
})
export class AppModule {}
