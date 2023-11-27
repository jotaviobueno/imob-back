import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from 'src/repositories/user';
import { PersonModule } from '../person/person.module';
import { S3Module } from '../s3/s3.module';
import { UserRoleModule } from '../user-role/user-role.module';

@Module({
  imports: [PersonModule, S3Module, UserRoleModule],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService],
})
export class UserModule {}
