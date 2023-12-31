import { Injectable } from '@nestjs/common';
import { RoleEntity } from 'src/domain/entities';
import { RepositoryFactory } from 'src/domain/factories';

@Injectable()
export class RoleRepository extends RepositoryFactory<RoleEntity> {
  constructor() {
    super('role');
  }

  findByName(name: string): Promise<RoleEntity> {
    return this.prismaService.role.findFirst({
      where: {
        name,
      },
    });
  }

  findManyWithIds(ids: string[]): Promise<RoleEntity[]> {
    return this.prismaService.role.findMany({
      where: {
        id: {
          in: ids,
        },
      },
      include: {
        rolePermission: {
          include: {
            permission: true,
          },
        },
      },
    });
  }
}
