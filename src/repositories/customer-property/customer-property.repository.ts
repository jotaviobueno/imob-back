import { Injectable } from '@nestjs/common';
import {
  CreateCustomerPropertyDto,
  UpdateCustomerPropertyDto,
} from 'src/domain/dtos';
import { CustomerPropertyEntity } from 'src/domain/entities';
import { RepositoryFactory } from 'src/domain/factories';

@Injectable()
export class CustomerPropertyRepository extends RepositoryFactory<
  CustomerPropertyEntity,
  CreateCustomerPropertyDto,
  UpdateCustomerPropertyDto
> {
  constructor() {
    super('customerProperty');
  }

  findByCustomerIdAndPropertyId(
    customerId: string,
    propertyId: string,
  ): Promise<CustomerPropertyEntity> {
    return this.prismaService.customerProperty.findFirst({
      where: {
        customerId,
        propertyId,
      },
    });
  }

  findAll(query: any): Promise<CustomerPropertyEntity[]> {
    return this.prismaService.customerProperty.findMany({
      ...query,
      where: {
        deletedAt: null,
      },
      select: {
        customer: {
          select: {
            person: true,
          },
        },
      },
    });
  }

  findById(id: string): Promise<CustomerPropertyEntity> {
    return this.prismaService.customerProperty.findFirst({
      where: {
        id,
        deletedAt: null,
      },
      include: {
        customer: {
          select: {
            person: true,
          },
        },
      },
    });
  }
}
