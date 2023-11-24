import { Injectable } from '@nestjs/common';
import { CreatePersonDto, UpdatePersonDto } from 'src/domain/dtos';
import { PersonEntity } from 'src/domain/entities';
import { RepositoryFactory } from 'src/domain/factories';

@Injectable()
export class PersonRepository extends RepositoryFactory<
  PersonEntity,
  CreatePersonDto,
  UpdatePersonDto
> {
  constructor() {
    super('person');
  }

  findByRg(rg: string): Promise<PersonEntity> {
    return this.prismaService.person.findFirst({
      where: {
        rg,
      },
    });
  }

  findByEmail(email: string): Promise<PersonEntity> {
    return this.prismaService.person.findFirst({
      where: {
        email,
      },
    });
  }

  findByCpf(cpf: string): Promise<PersonEntity> {
    return this.prismaService.person.findFirst({
      where: {
        cpf,
      },
    });
  }

  findByPhone(phone: string): Promise<PersonEntity> {
    return this.prismaService.person.findFirst({
      where: {
        phone,
      },
    });
  }
}
