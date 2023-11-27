import { Injectable } from '@nestjs/common';
import { CreatePersonDto, UpdatePersonDto } from 'src/domain/dtos';
import { PersonEntity } from 'src/domain/entities';
import { PERSON_TYPE } from 'src/domain/enums';
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

  findByRg(rg: string, type: PERSON_TYPE): Promise<PersonEntity> {
    return this.prismaService.person.findFirst({
      where: {
        rg,
        type,
      },
    });
  }

  findByEmail(email: string, type: PERSON_TYPE): Promise<PersonEntity> {
    return this.prismaService.person.findFirst({
      where: {
        email,
        type,
      },
    });
  }

  findByCpf(cpf: string, type: PERSON_TYPE): Promise<PersonEntity> {
    return this.prismaService.person.findFirst({
      where: {
        cpf,
        type,
      },
    });
  }

  findByPhone(phone: string, type: PERSON_TYPE): Promise<PersonEntity> {
    return this.prismaService.person.findFirst({
      where: {
        phone,
        type,
      },
    });
  }
}
