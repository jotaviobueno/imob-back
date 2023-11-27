import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleGuard } from './guards';
import { Roles } from './decorators';
import { QueryParamsDto } from 'src/domain/dtos';
import { PERMISSION_ENUM, ROLE_ENUM } from 'src/domain/enums';
import { Permissions } from '../permission/decorators';

@Controller('role')
@UseGuards(RoleGuard)
@Roles(ROLE_ENUM.ADMIN, ROLE_ENUM.DEV)
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  @Permissions(PERMISSION_ENUM.CAN_READ_ROLE)
  findAll(@Query() queryParamsDto: QueryParamsDto) {
    return this.roleService.findAll(queryParamsDto);
  }

  @Get(':id')
  @Permissions(PERMISSION_ENUM.CAN_READ_ROLE)
  findOne(@Param('id') id: string) {
    return this.roleService.findOne(id);
  }
}
