import { Injectable } from '@nestjs/common';
import { CreatePropertyDto, UpdatePropertyDto } from 'src/domain/dtos';
import { PropertyEntity } from 'src/domain/entities';
import { RepositoryFactory } from 'src/domain/factories';

@Injectable()
export class PropertyRepository extends RepositoryFactory<
  PropertyEntity,
  CreatePropertyDto,
  UpdatePropertyDto
> {
  constructor() {
    super('property');
  }

  findAll(query: any): Promise<PropertyEntity[]> {
    return this.prismaService.property.findMany({
      ...query,
      where: {
        deletedAt: null,
      },
      include: {
        address: true,
        realEstate: true,
      },
    });
  }
}
