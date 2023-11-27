import { Module } from '@nestjs/common';
import { TypeService } from './type.service';
import { TypeController } from './type.controller';
import { TypeRepository } from 'src/repositories/type';

@Module({
  controllers: [TypeController],
  providers: [TypeService, TypeRepository],
  exports: [TypeService],
})
export class TypeModule {}
