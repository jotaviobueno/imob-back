import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PersonEntity, UserEntity } from 'src/domain/entities';
import { UserRoleService } from '../../user-role/user-role.service';
import { ROLE_KEY } from '../decorators';
import { RoleService } from '../role.service';
import { PERMISSION_KEY } from 'src/modules/permission/decorators';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly userRoleService: UserRoleService,
    private readonly roleService: RoleService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const user: UserEntity & { user: PersonEntity } = context
      .switchToHttp()
      .getRequest()?.user;

    if (!user) return false;

    const userRoles = await this.userRoleService.findManyWithPersonId(user.id);

    const rolesIds = userRoles.map((personRole) => personRole.roleId);

    const roles = await this.roleService.findManyWithIds(rolesIds);

    const requiredRoles: string[] = this.reflector.getAllAndOverride(ROLE_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const requiredPermissions: string[] = this.reflector.getAllAndOverride(
      PERMISSION_KEY,
      [context.getHandler(), context.getClass()],
    );

    let hasPermission = false;

    for (const role of roles) {
      if (
        requiredRoles?.length >= 1 &&
        requiredRoles.some((requiredRole) => requiredRole === role.name)
      )
        hasPermission = true;

      if (requiredPermissions?.length >= 1)
        for (const { permission } of (role as any).rolePermission) {
          if (
            requiredPermissions.some(
              (requiredPermission) => requiredPermission === permission.name,
            )
          )
            hasPermission = true;
        }

      if (role.name === 'ADMIN' || role.name === 'DEV') hasPermission = true;
    }

    return hasPermission;
  }
}
