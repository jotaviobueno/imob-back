import { Injectable } from '@nestjs/common';
import { UserRoleDto } from 'src/domain/dtos';
import { UserRoleEntity } from 'src/domain/entities';
import { RepositoryFactory } from 'src/domain/factories';

@Injectable()
export class UserRoleRepository extends RepositoryFactory<
  UserRoleEntity,
  UserRoleDto
> {
  constructor() {
    super('userRole');
  }

  findByPersonIdAndRoleId({
    userId,
    roleId,
  }: UserRoleDto): Promise<UserRoleEntity> {
    return this.prismaService.userRole.findFirst({
      where: {
        userId,
        roleId,
      },
    });
  }

  findManyWithPersonId(userId: string): Promise<UserRoleEntity[]> {
    return this.prismaService.userRole.findMany({
      where: {
        userId,
      },
    });
  }
}
