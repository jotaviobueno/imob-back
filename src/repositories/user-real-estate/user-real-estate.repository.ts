import { Injectable } from '@nestjs/common';
import {
  CreateUserRealEstateDto,
  UpdateUserRealEstateDto,
} from 'src/domain/dtos';
import { UserRealEstateEntity } from 'src/domain/entities/user-real-estate';
import { RepositoryFactory } from 'src/domain/factories';

@Injectable()
export class UserRealEstateRepository extends RepositoryFactory<
  UserRealEstateEntity,
  CreateUserRealEstateDto,
  UpdateUserRealEstateDto
> {
  constructor() {
    super('userRealEstate');
  }

  findByUserIdAndRealEstateId(
    userId: string,
    realEstateId: string,
  ): Promise<UserRealEstateEntity> {
    return this.prismaService.userRealEstate.findFirst({
      where: {
        userId,
        realEstateId,
      },
    });
  }

  findAll(query: any): Promise<UserRealEstateEntity[]> {
    return this.prismaService.userRealEstate.findMany({
      ...query,
      where: {
        deletedAt: null,
      },
      include: {
        user: {
          where: {
            deletedAt: null,
          },
        },
        realEstate: {
          where: {
            deletedAt: null,
          },
        },
      },
    });
  }
}
