import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ServiceBase } from 'src/domain/bases';
import {
  CreateCustomerDto,
  QueryParamsDto,
  UpdateCustomerDto,
} from 'src/domain/dtos';
import { CustomerEntity, IFindMany } from 'src/domain/entities';
import { CustomerRepository } from 'src/repositories/customer';
import { AddressService } from '../address/address.service';
import { PersonService } from '../person/person.service';
import { PERSON_TYPE } from 'src/domain/enums';
import { QueryBuilder, isMongoId } from 'src/domain/utils';

@Injectable()
export class CustomerService
  implements
    Partial<ServiceBase<CustomerEntity, CreateCustomerDto, UpdateCustomerDto>>
{
  constructor(
    private readonly customerRepository: CustomerRepository,
    private readonly addressService: AddressService,
    private readonly personService: PersonService,
  ) {}

  async create({
    addressId,
    ...createPersonDto
  }: CreateCustomerDto): Promise<CustomerEntity> {
    const address = await this.addressService.findOne(addressId);

    const phoneAlreadyExist = await this.personService.findByPhone(
      createPersonDto.phone,
      PERSON_TYPE.CUSTOMER,
    );

    if (phoneAlreadyExist)
      throw new HttpException('this phone already exist', HttpStatus.CONFLICT);

    const cpfAlreadyExist = await this.personService.findByCpf(
      createPersonDto.cpf,
      PERSON_TYPE.CUSTOMER,
    );

    if (cpfAlreadyExist)
      throw new HttpException('this cpf already exist', HttpStatus.CONFLICT);

    const emailAlreadyExist = await this.personService.findByEmail(
      createPersonDto.email,
      PERSON_TYPE.CUSTOMER,
    );

    if (emailAlreadyExist)
      throw new HttpException('this email already exist', HttpStatus.CONFLICT);

    if (createPersonDto.rg) {
      const rgAlreadyExist = await this.personService.findByRg(
        createPersonDto.rg,
        PERSON_TYPE.CUSTOMER,
      );

      if (rgAlreadyExist)
        throw new HttpException('this rg already exist', HttpStatus.CONFLICT);
    }

    const person = await this.personService.create({
      ...createPersonDto,
      type: 'CUSTOMER',
    });

    const customer = await this.customerRepository.create({
      addressId: address.id,
      personId: person.id,
    });

    return customer;
  }

  async findAll(
    queryParams: QueryParamsDto,
  ): Promise<IFindMany<CustomerEntity>> {
    const query = new QueryBuilder(queryParams).handle();

    const data = await this.customerRepository.findAll(query);
    const total = await this.customerRepository.count();

    return { data, total };
  }

  async findOne(id: string): Promise<CustomerEntity> {
    if (!isMongoId(id))
      throw new HttpException(
        'Id sent its not mongo id',
        HttpStatus.BAD_REQUEST,
      );

    const customer = await this.customerRepository.findById(id);

    if (!customer)
      throw new HttpException('customer not found', HttpStatus.NOT_FOUND);

    return customer;
  }

  async update({
    id,
    addressId,
    ...updatePersonDto
  }: UpdateCustomerDto): Promise<CustomerEntity> {
    const customer = await this.findOne(id);

    if (addressId) await this.addressService.findOne(addressId);

    if (updatePersonDto.phone) {
      const phoneAlreadyExist = await this.personService.findByPhone(
        updatePersonDto.phone,
        PERSON_TYPE.CUSTOMER,
      );

      if (phoneAlreadyExist)
        throw new HttpException(
          'this phone already exist',
          HttpStatus.CONFLICT,
        );
    }

    if (updatePersonDto.cpf) {
      const cpfAlreadyExist = await this.personService.findByCpf(
        updatePersonDto.cpf,
        PERSON_TYPE.CUSTOMER,
      );

      if (cpfAlreadyExist)
        throw new HttpException('this cpf already exist', HttpStatus.CONFLICT);
    }

    if (updatePersonDto.email) {
      const emailAlreadyExist = await this.personService.findByEmail(
        updatePersonDto.email,
        PERSON_TYPE.CUSTOMER,
      );

      if (emailAlreadyExist)
        throw new HttpException(
          'this email already exist',
          HttpStatus.CONFLICT,
        );
    }

    if (updatePersonDto.rg) {
      const rgAlreadyExist = await this.personService.findByRg(
        updatePersonDto.rg,
        PERSON_TYPE.CUSTOMER,
      );

      if (rgAlreadyExist)
        throw new HttpException('this rg already exist', HttpStatus.CONFLICT);
    }

    if (updatePersonDto)
      await this.personService.update({
        id: customer.personId,
        ...updatePersonDto,
      });

    const update = await this.customerRepository.update({ id, addressId });

    if (!update)
      throw new HttpException('Failed to update', HttpStatus.NOT_ACCEPTABLE);

    return update;
  }

  async remove(id: string): Promise<boolean> {
    const customer = await this.findOne(id);

    const remove = await this.customerRepository.destroy(customer.id);

    if (!remove)
      throw new HttpException('Failed to update', HttpStatus.NOT_ACCEPTABLE);

    return true;
  }
}
