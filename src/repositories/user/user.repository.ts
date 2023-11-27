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
    | 'type'
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
    | 'type'
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
      where: {
        deletedAt: null,
      },
      select: {
        id: true,
        personId: true,
        createdAt: true,
        updatedAt: true,
        deletedAt: true,
        person: {
          select: {
            id: true,
            fullName: true,
            email: true,
            phone: true,
            cpf: true,
            rg: true,
            birthDate: true,
            gender: true,
            nationality: true,
            type: true,
            createdAt: true,
            updatedAt: true,
            deletedAt: true,
          },
        },
        avatar: true,
        userRole: {
          select: {
            id: true,
            role: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });
  }

  findByEmail(email: string): Promise<UserEntity> {
    return this.prismaService.user.findFirst({
      where: {
        person: {
          email,
          type: 'USER',
        },
      },
    });
  }

  findById(id: string): Promise<UserEntity> {
    return this.prismaService.user.findFirst({
      where: {
        id,
        deletedAt: null,
      },
      include: {
        person: true,
        userRole: {
          select: {
            id: true,
            role: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });
  }
}
