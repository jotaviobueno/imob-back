import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserRoleDto } from 'src/domain/dtos';
import { UserRoleEntity } from 'src/domain/entities';
import { UserRoleRepository } from 'src/repositories/user-role';
import { RoleService } from '../role/role.service';
import { ServiceBase } from 'src/domain/bases';
import { UserService } from '../user/user.service';
import { ROLE_ENUM } from 'src/domain/enums';

@Injectable()
export class UserRoleService
  implements Partial<ServiceBase<UserRoleDto, UserRoleEntity>>
{
  constructor(
    private readonly userRoleRepository: UserRoleRepository,
    private readonly userService: UserService,
    private readonly roleService: RoleService,
  ) {}

  async create({
    name,
    ...dto
  }: Omit<UserRoleDto, 'roleId'> & {
    name?: ROLE_ENUM;
  }): Promise<UserRoleEntity> {
    const role = await this.roleService.findByName(name);

    return this.userRoleRepository.create({ ...dto, roleId: role.id });
  }

  async assign(data: UserRoleDto): Promise<UserRoleEntity> {
    const user = await this.userService.findOne(data.userId);

    const role = await this.roleService.findOne(data.roleId);

    const personAlreadyThisRole =
      await this.userRoleRepository.findByPersonIdAndRoleId({
        userId: user.id,
        roleId: role.id,
      });

    if (personAlreadyThisRole)
      throw new HttpException(
        'This user already this role',
        HttpStatus.CONFLICT,
      );

    const userRole = await this.userRoleRepository.create(data);

    return userRole;
  }

  async findOne(id: string): Promise<UserRoleEntity> {
    const userRole = await this.userRoleRepository.findById(id);

    if (!userRole)
      throw new HttpException('User role not found', HttpStatus.NOT_FOUND);

    return userRole;
  }

  findManyWithPersonId(userId: string): Promise<UserRoleEntity[]> {
    return this.userRoleRepository.findManyWithPersonId(userId);
  }

  async unlink(data: UserRoleDto): Promise<UserRoleEntity> {
    const user = await this.userService.findOne(data.userId);

    const role = await this.roleService.findOne(data.roleId);

    const personAlreadyThisRole =
      await this.userRoleRepository.findByPersonIdAndRoleId({
        userId: user.id,
        roleId: role.id,
      });

    if (!personAlreadyThisRole)
      throw new HttpException(
        'This user not have this role',
        HttpStatus.BAD_REQUEST,
      );

    const personRole = await this.userRoleRepository.destroy(
      personAlreadyThisRole.id,
    );

    return personRole;
  }
}
