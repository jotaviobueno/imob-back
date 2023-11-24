import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from 'src/repositories/user';
import { PersonModule } from '../person/person.module';
import { UploadModule } from '../upload/upload.module';

@Module({
  imports: [PersonModule, UploadModule],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService],
})
export class UserModule {}
