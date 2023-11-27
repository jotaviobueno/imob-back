import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ServiceBase } from 'src/domain/bases';
import { CreateTypeDto, QueryParamsDto, UpdateTypeDto } from 'src/domain/dtos';
import { IFindMany, TypeEntity } from 'src/domain/entities';
import { QueryBuilder, isMongoId } from 'src/domain/utils';
import { TypeRepository } from 'src/repositories/type';

@Injectable()
export class TypeService
  implements Partial<ServiceBase<TypeEntity, CreateTypeDto, UpdateTypeDto>>
{
  constructor(private readonly typeRepository: TypeRepository) {}

  async create(dto: CreateTypeDto): Promise<TypeEntity> {
    const nameAlreadyExist = await this.typeRepository.findByName(dto.name);

    if (nameAlreadyExist)
      throw new HttpException('Name already exist', HttpStatus.BAD_REQUEST);

    const type = await this.typeRepository.create(dto);

    return type;
  }

  async findAll(queryParams: QueryParamsDto): Promise<IFindMany<TypeEntity>> {
    const query = new QueryBuilder(queryParams).handle();

    const data = await this.typeRepository.findAll(query);
    const total = await this.typeRepository.count();

    return { data, total };
  }

  async findOne(id: string): Promise<TypeEntity> {
    if (!isMongoId(id))
      throw new HttpException(
        'Id sent its not mongo id',
        HttpStatus.BAD_REQUEST,
      );

    const type = await this.typeRepository.findById(id);

    if (!type) throw new HttpException('type not found', HttpStatus.NOT_FOUND);

    return type;
  }

  async update(dto: UpdateTypeDto): Promise<TypeEntity> {
    const type = await this.findOne(dto.id);

    if (dto.name) {
      const nameAlreadyExist = await this.typeRepository.findByName(dto.name);

      if (nameAlreadyExist)
        throw new HttpException('Name already exist', HttpStatus.BAD_REQUEST);
    }

    const update = await this.typeRepository.update({ ...dto, id: type.id });

    if (!update)
      throw new HttpException('Failed to update', HttpStatus.NOT_ACCEPTABLE);

    return update;
  }

  async remove(id: string): Promise<boolean> {
    const type = await this.findOne(id);

    const remove = await this.typeRepository.destroy(type.id);

    if (!remove)
      throw new HttpException('Failed to remove', HttpStatus.NOT_ACCEPTABLE);

    return true;
  }
}
