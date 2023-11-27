import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ServiceBase } from 'src/domain/bases';
import {
  CreateCustomerPropertyDto,
  QueryParamsDto,
  UpdateCustomerPropertyDto,
} from 'src/domain/dtos';
import { CustomerPropertyEntity, IFindMany } from 'src/domain/entities';
import { PropertyService } from '../property/property.service';
import { CustomerService } from '../customer/customer.service';
import { CustomerPropertyRepository } from 'src/repositories/customer-property';
import { QueryBuilder, isMongoId } from 'src/domain/utils';

@Injectable()
export class CustomerPropertyService
  implements
    Partial<
      ServiceBase<
        CustomerPropertyEntity,
        CreateCustomerPropertyDto,
        UpdateCustomerPropertyDto
      >
    >
{
  constructor(
    private readonly propertyService: PropertyService,
    private readonly customerService: CustomerService,
    private readonly customerPropertyRepository: CustomerPropertyRepository,
  ) {}

  async create(
    dto: CreateCustomerPropertyDto,
  ): Promise<CustomerPropertyEntity> {
    const customer = await this.customerService.findOne(dto.customerId);

    const property = await this.propertyService.findOne(dto.propertyId);

    const customerAlreadyExistInThisProperty =
      await this.customerPropertyRepository.findByCustomerIdAndPropertyId(
        customer.id,
        property.id,
      );

    if (customerAlreadyExistInThisProperty)
      throw new HttpException(
        'this customer already exist in this property',
        HttpStatus.CONFLICT,
      );

    const customerProperty = await this.customerPropertyRepository.create(dto);

    return customerProperty;
  }

  async findOne(id: string): Promise<CustomerPropertyEntity> {
    if (!isMongoId(id))
      throw new HttpException(
        'Id sent its not mongo id',
        HttpStatus.BAD_REQUEST,
      );

    const customerProperty = await this.customerPropertyRepository.findById(id);

    if (!customerProperty)
      throw new HttpException(
        'customer real estate not found',
        HttpStatus.NOT_FOUND,
      );

    return customerProperty;
  }

  async findAll(
    queryParams: QueryParamsDto,
  ): Promise<IFindMany<CustomerPropertyEntity>> {
    const query = new QueryBuilder(queryParams).handle();

    const data = await this.customerPropertyRepository.findAll(query);
    const total = await this.customerPropertyRepository.count();

    return { data, total };
  }

  async update(
    dto: UpdateCustomerPropertyDto,
  ): Promise<CustomerPropertyEntity> {
    const customerProperty = await this.findOne(dto.id);

    if (dto.customerId) {
      const customer = await this.customerService.findOne(dto.customerId);

      const customerAlreadyExistInThisProperty =
        await this.customerPropertyRepository.findByCustomerIdAndPropertyId(
          customer.id,
          customerProperty.propertyId,
        );

      if (customerAlreadyExistInThisProperty)
        throw new HttpException(
          'customer already exist in this property',
          HttpStatus.CONFLICT,
        );
    }

    if (dto.propertyId) {
      const property = await this.propertyService.findOne(dto.propertyId);

      const propertyAlreadyExistInThisCustomer =
        await this.customerPropertyRepository.findByCustomerIdAndPropertyId(
          customerProperty.customerId,
          property.id,
        );

      if (propertyAlreadyExistInThisCustomer)
        throw new HttpException(
          'property already exist in this customer',
          HttpStatus.CONFLICT,
        );
    }

    const update = await this.customerPropertyRepository.update({
      ...dto,
      id: customerProperty.id,
    });

    if (!update)
      throw new HttpException('Failed to update', HttpStatus.NOT_ACCEPTABLE);

    return update;
  }

  async remove(id: string): Promise<boolean> {
    const customerProperty = await this.findOne(id);

    const remove = await this.customerPropertyRepository.destroy(
      customerProperty.id,
    );

    if (!remove)
      throw new HttpException('Failed to remove', HttpStatus.NOT_ACCEPTABLE);

    return true;
  }
}
