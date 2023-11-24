import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from 'src/domain/dtos';
import { PersonEntity, UserEntity } from 'src/domain/entities';
import { RepositoryFactory } from 'src/domain/factories';

@Injectable()
export class UserRepository extends RepositoryFactory<
  UserEntity,
  Omit<
    CreateUserDto,
    | 'fullName'
    | 'email'
    | 'phone'
    | 'cpf'
    | 'rg'
    | 'birthDate'
    | 'gender'
    | 'nationality'
  >,
  Omit<
    UpdateUserDto,
    | 'fullName'
    | 'email'
    | 'phone'
    | 'cpf'
    | 'rg'
    | 'birthDate'
    | 'gender'
    | 'nationality'
  >
> {
  constructor() {
    super('user');
  }

  findAll(
    query: any,
  ): Promise<Omit<UserEntity, 'password' & { person: PersonEntity }>[]> {
    return this.prismaService.user.findMany({
      ...query,
      where: {},
      select: {
        id: true,
        personId: true,
        createdAt: true,
        updatedAt: true,
        deletedAt: true,
        person: true,
      },
    });
  }
}
