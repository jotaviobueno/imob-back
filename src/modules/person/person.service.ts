import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePersonDto } from '../../domain/dtos/person/create-person.dto';
import { UpdatePersonDto } from '../../domain/dtos/person/update-person.dto';
import { ServiceBase } from 'src/domain/bases';
import { IFindMany, PersonEntity } from 'src/domain/entities';
import { QueryParamsDto } from 'src/domain/dtos';
import { PersonRepository } from 'src/repositories/person';
import { QueryBuilder, isMongoId } from 'src/domain/utils';

@Injectable()
export class PersonService
  implements
    Partial<ServiceBase<PersonEntity, CreatePersonDto, UpdatePersonDto>>
{
  constructor(private readonly personRepository: PersonRepository) {}

  async create(dto: CreatePersonDto): Promise<PersonEntity> {
    return this.personRepository.create(dto);
  }

  async findAll(queryParams: QueryParamsDto): Promise<IFindMany<PersonEntity>> {
    const query = new QueryBuilder(queryParams).handle();

    const data = await this.personRepository.findAll(query);
    const total = await this.personRepository.count();

    return { data, total };
  }

  async findOne(id: string): Promise<PersonEntity> {
    if (!isMongoId(id))
      throw new HttpException(
        'Id sent its not mongo id',
        HttpStatus.BAD_REQUEST,
      );

    const person = await this.personRepository.findById(id);

    if (!person)
      throw new HttpException('person not found', HttpStatus.NOT_FOUND);

    return person;
  }

  async update(dto: UpdatePersonDto): Promise<PersonEntity> {
    const person = await this.findOne(dto.id);

    const update = await this.personRepository.update({
      id: person.id,
      ...dto,
    });

    if (!update)
      throw new HttpException('Failed to update', HttpStatus.NOT_ACCEPTABLE);

    return update;
  }

  async softDelete(id: string): Promise<boolean> {
    const person = await this.findOne(id);

    const remove = await this.personRepository.softDelete(person.id);

    if (!remove)
      throw new HttpException('Failed to remove', HttpStatus.NOT_ACCEPTABLE);

    return true;
  }
}
