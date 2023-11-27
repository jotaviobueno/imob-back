import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ServiceBase } from 'src/domain/bases';
import {
  CreateCustomerRealEstateDto,
  QueryParamsDto,
  UpdateCustomerRealEstateDto,
} from 'src/domain/dtos';
import { CustomerRealEstateEntity, IFindMany } from 'src/domain/entities';
import { CustomerRealEstateRepository } from 'src/repositories/customer-real-estate';
import { CustomerService } from '../customer/customer.service';
import { RealEstateService } from '../real-estate/real-estate.service';
import { QueryBuilder, isMongoId } from 'src/domain/utils';

@Injectable()
export class CustomerRealEstateService
  implements
    Partial<
      ServiceBase<
        CustomerRealEstateEntity,
        CreateCustomerRealEstateDto,
        UpdateCustomerRealEstateDto
      >
    >
{
  constructor(
    private readonly customerService: CustomerService,
    private readonly realEstateService: RealEstateService,
    private readonly customerRealEstateRepository: CustomerRealEstateRepository,
  ) {}

  async create(
    dto: CreateCustomerRealEstateDto,
  ): Promise<CustomerRealEstateEntity> {
    const customer = await this.customerService.findOne(dto.customerId);

    const realEstate = await this.realEstateService.findOne(dto.realEstateId);

    const customerAlreadyExistInRealEstate =
      await this.customerRealEstateRepository.findByCustomerIdAndRealEstateId(
        customer.id,
        realEstate.id,
      );

    if (customerAlreadyExistInRealEstate)
      throw new HttpException(
        'this customer already exist in this real estate',
        HttpStatus.CONFLICT,
      );

    const customerRealEstate =
      await this.customerRealEstateRepository.create(dto);

    return customerRealEstate;
  }

  async findOne(id: string): Promise<CustomerRealEstateEntity> {
    if (!isMongoId(id))
      throw new HttpException(
        'Id sent its not mongo id',
        HttpStatus.BAD_REQUEST,
      );

    const customerRealEstate =
      await this.customerRealEstateRepository.findById(id);

    if (!customerRealEstate)
      throw new HttpException(
        'customer real estate not found',
        HttpStatus.NOT_FOUND,
      );

    return customerRealEstate;
  }

  async findAll(
    queryParams: QueryParamsDto,
  ): Promise<IFindMany<CustomerRealEstateEntity>> {
    const query = new QueryBuilder(queryParams).handle();

    const data = await this.customerRealEstateRepository.findAll(query);
    const total = await this.customerRealEstateRepository.count();

    return { data, total };
  }

  async update(
    dto: UpdateCustomerRealEstateDto,
  ): Promise<CustomerRealEstateEntity> {
    const userRealEstate = await this.findOne(dto.id);

    if (dto.customerId) {
      const customer = await this.customerService.findOne(dto.customerId);

      const customerAlreadyExistInRealEstate =
        await this.customerRealEstateRepository.findByCustomerIdAndRealEstateId(
          customer.id,
          userRealEstate.realEstateId,
        );

      if (customerAlreadyExistInRealEstate)
        throw new HttpException(
          'customer already exist in this real estate',
          HttpStatus.CONFLICT,
        );
    }

    if (dto.realEstateId) {
      const realEstate = await this.realEstateService.findOne(dto.realEstateId);

      const realEstateAlreadyExistInUser =
        await this.customerRealEstateRepository.findByCustomerIdAndRealEstateId(
          userRealEstate.customerId,
          realEstate.id,
        );

      if (realEstateAlreadyExistInUser)
        throw new HttpException(
          'real estate already exist in this customer',
          HttpStatus.CONFLICT,
        );
    }

    const update = await this.customerRealEstateRepository.update({
      ...dto,
      id: userRealEstate.id,
    });

    if (!update)
      throw new HttpException('Failed to update', HttpStatus.NOT_ACCEPTABLE);

    return update;
  }

  async remove(id: string): Promise<boolean> {
    const customerRealEstate = await this.findOne(id);

    const remove = await this.customerRealEstateRepository.destroy(
      customerRealEstate.id,
    );

    if (!remove)
      throw new HttpException('Failed to remove', HttpStatus.NOT_ACCEPTABLE);

    return true;
  }
}
