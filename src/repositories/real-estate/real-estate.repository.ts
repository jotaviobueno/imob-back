import { Injectable } from '@nestjs/common';
import { CreateRealEstateDto, UpdateRealEstateDto } from 'src/domain/dtos';
import { RealEstateEntity } from 'src/domain/entities';
import { RepositoryFactory } from 'src/domain/factories';

@Injectable()
export class RealEstateRepository extends RepositoryFactory<
  RealEstateEntity,
  CreateRealEstateDto,
  UpdateRealEstateDto
> {
  constructor() {
    super('realEstate');
  }

  findAll(query: any): Promise<RealEstateEntity[]> {
    return this.prismaService.realEstate.findMany({
      ...query,
      where: {
        deletedAt: null,
      },
      include: {
        address: {
          where: {
            deletedAt: null,
          },
        },
      },
    });
  }

  findById(id: string): Promise<RealEstateEntity> {
    return this.prismaService.realEstate.findFirst({
      where: {
        id,
        deletedAt: null,
      },
      include: {
        address: {
          where: {
            deletedAt: null,
          },
        },
      },
    });
  }
}
