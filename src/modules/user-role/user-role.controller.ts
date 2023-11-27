import { Controller, Post, Body, Delete, UseGuards } from '@nestjs/common';
import { UserRoleService } from './user-role.service';
import { UserRoleDto } from 'src/domain/dtos';
import { RoleGuard } from '../role/guards';
import { Roles } from '../role/decorators';
import { PERMISSION_ENUM, ROLE_ENUM } from 'src/domain/enums';
import { Permissions } from '../permission/decorators';

@Controller('user-role')
@UseGuards(RoleGuard)
@Roles(ROLE_ENUM.ADMIN, ROLE_ENUM.DEV)
export class UserRoleController {
  constructor(private readonly personRoleService: UserRoleService) {}

  @Post()
  @Permissions(PERMISSION_ENUM.CAN_ASSIGN_USER_IN_ROLE)
  create(@Body() userRoleDto: UserRoleDto) {
    return this.personRoleService.assign(userRoleDto);
  }

  @Delete()
  @Permissions(PERMISSION_ENUM.CAN_UNLINK_USER_IN_ROLE)
  remove(@Body() userRoleDto: UserRoleDto) {
    return this.personRoleService.unlink(userRoleDto);
  }
}
