import { Injectable } from '@nestjs/common';
import { CreateAddressDto, UpdateAddressDto } from 'src/domain/dtos';
import { AddressEntity } from 'src/domain/entities';
import { RepositoryFactory } from 'src/domain/factories';

@Injectable()
export class AddressRepository extends RepositoryFactory<
  AddressEntity,
  CreateAddressDto,
  UpdateAddressDto
> {
  constructor() {
    super('address');
  }
}
