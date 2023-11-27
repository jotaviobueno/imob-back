import { Injectable } from '@nestjs/common';
import {
  CreateCustomerRealEstateDto,
  UpdateCustomerRealEstateDto,
} from 'src/domain/dtos';
import { CustomerRealEstateEntity } from 'src/domain/entities';
import { RepositoryFactory } from 'src/domain/factories';

@Injectable()
export class CustomerRealEstateRepository extends RepositoryFactory<
  CustomerRealEstateEntity,
  CreateCustomerRealEstateDto,
  UpdateCustomerRealEstateDto
> {
  constructor() {
    super('customerRealEstate');
  }

  findByCustomerIdAndRealEstateId(
    customerId: string,
    realEstateId: string,
  ): Promise<CustomerRealEstateEntity> {
    return this.prismaService.customerRealEstate.findFirst({
      where: {
        customerId,
        realEstateId,
      },
    });
  }

  findAll(query: any): Promise<CustomerRealEstateEntity[]> {
    return this.prismaService.customerRealEstate.findMany({
      ...query,
      where: {
        deletedAt: null,
      },
      include: {
        customer: true,
        realEstate: true,
      },
    });
  }

  findById(id: string): Promise<CustomerRealEstateEntity> {
    return this.prismaService.customerRealEstate.findFirst({
      where: {
        id,
        deletedAt: null,
      },
      include: {
        customer: true,
        realEstate: true,
      },
    });
  }
}
