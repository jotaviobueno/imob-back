import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ServiceBase } from 'src/domain/bases';
import {
  CreateAddressDto,
  QueryParamsDto,
  UpdateAddressDto,
} from 'src/domain/dtos';
import { AddressEntity, IFindMany } from 'src/domain/entities';
import { QueryBuilder, isMongoId } from 'src/domain/utils';
import { AddressRepository } from 'src/repositories/address';

@Injectable()
export class AddressService
  implements
    Partial<ServiceBase<AddressEntity, CreateAddressDto, UpdateAddressDto>>
{
  constructor(private readonly addressRepository: AddressRepository) {}

  create(dto: CreateAddressDto): Promise<AddressEntity> {
    return this.addressRepository.create(dto);
  }

  async findOne(id: string): Promise<AddressEntity> {
    if (!isMongoId(id))
      throw new HttpException(
        'Id sent its not mongo id',
        HttpStatus.BAD_REQUEST,
      );

    const address = await this.addressRepository.findById(id);

    if (!address)
      throw new HttpException('address not found', HttpStatus.NOT_FOUND);

    return address;
  }

  async findAll(
    queryParams: QueryParamsDto,
  ): Promise<IFindMany<AddressEntity>> {
    const query = new QueryBuilder(queryParams).handle();

    const data = await this.addressRepository.findAll(query);
    const total = await this.addressRepository.count();

    return { data, total };
  }

  async update(dto: UpdateAddressDto): Promise<AddressEntity> {
    const address = await this.findOne(dto.id);

    const update = await this.addressRepository.update({
      ...dto,
      id: address.id,
    });

    if (!update)
      throw new HttpException('Failed to update', HttpStatus.NOT_ACCEPTABLE);

    return update;
  }

  async softDelete(id: string): Promise<boolean> {
    const address = await this.findOne(id);

    const remove = await this.addressRepository.destroy(address.id);

    if (!remove)
      throw new HttpException('Failed to remove', HttpStatus.NOT_ACCEPTABLE);

    return true;
  }
}
