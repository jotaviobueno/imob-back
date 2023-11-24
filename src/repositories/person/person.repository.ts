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
}
