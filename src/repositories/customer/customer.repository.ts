import { Injectable } from '@nestjs/common';
import { CreateCustomerDto, UpdateCustomerDto } from 'src/domain/dtos';
import { CustomerEntity } from 'src/domain/entities';
import { RepositoryFactory } from 'src/domain/factories';

@Injectable()
export class CustomerRepository extends RepositoryFactory<
  CustomerEntity,
  Omit<
    CreateCustomerDto,
    | 'fullName'
    | 'email'
    | 'phone'
    | 'cpf'
    | 'rg'
    | 'birthDate'
    | 'gender'
    | 'nationality'
    | 'type'
  >,
  Omit<
    UpdateCustomerDto,
    | 'fullName'
    | 'email'
    | 'phone'
    | 'cpf'
    | 'rg'
    | 'birthDate'
    | 'gender'
    | 'nationality'
    | 'type'
  >
> {
  constructor() {
    super('customer');
  }

  findAll(query: any): Promise<CustomerEntity[]> {
    return this.prismaService.customer.findMany({
      ...query,
      where: {
        deletedAt: null,
      },
      include: {
        address: true,
        person: true,
      },
    });
  }

  findById(id: string): Promise<CustomerEntity> {
    return this.prismaService.customer.findFirst({
      where: {
        id,
        deletedAt: null,
      },
      include: {
        address: true,
        person: true,
      },
    });
  }
}
