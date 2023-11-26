import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { MenuService } from './menu.service';
import { IsPublic } from '../access/decorators';
import { RoleGuard } from '../role/guards';
import { Roles } from '../role/decorators';
import { PERMISSION, ROLE_ENUM } from 'src/domain/enums';
import { CreateMenuDto, QueryParamsDto, UpdateMenuDto } from 'src/domain/dtos';
import { Permissions } from '../permission/decorators';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post()
  @UseGuards(RoleGuard)
  @Roles(ROLE_ENUM.ADMIN, ROLE_ENUM.DEV)
  @Permissions(PERMISSION.CAN_CREATE_MENU)
  create(@Body() createMenuDto: CreateMenuDto) {
    return this.menuService.create(createMenuDto);
  }

  @Get()
  @IsPublic()
  findAll(@Query() queryParamsDto: QueryParamsDto) {
    return this.menuService.findAll(queryParamsDto);
  }

  @Get(':id')
  @IsPublic()
  findOne(@Param('id') id: string) {
    return this.menuService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(RoleGuard)
  @Roles(ROLE_ENUM.ADMIN, ROLE_ENUM.DEV)
  @Permissions(PERMISSION.CAN_UPDATE_MENU)
  update(@Param('id') id: string, @Body() updateMenuDto: UpdateMenuDto) {
    return this.menuService.update({ ...updateMenuDto, id });
  }

  @Delete(':id')
  @UseGuards(RoleGuard)
  @Roles(ROLE_ENUM.ADMIN, ROLE_ENUM.DEV)
  @Permissions(PERMISSION.CAN_DELETE_MENU)
  remove(@Param('id') id: string) {
    return this.menuService.remove(id);
  }
}
