import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from 'src/domain/dtos';
import { UserEntity } from 'src/domain/entities';
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

  findAll(query: any): Promise<UserEntity[]> {
    return this.prismaService.user.findMany({
      where: {
        ...query,
      },
      include: {
        person: true,
      },
    });
  }
}
