import { Module } from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuController } from './menu.controller';
import { MenuRepository } from 'src/repositories/menu';

@Module({
  controllers: [MenuController],
  providers: [MenuService, MenuRepository],
  exports: [MenuService],
})
export class MenuModule {}
