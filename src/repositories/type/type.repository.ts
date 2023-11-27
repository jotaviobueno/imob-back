import { Injectable } from '@nestjs/common';
import { CreateTypeDto, UpdateTypeDto } from 'src/domain/dtos';
import { TypeEntity } from 'src/domain/entities';
import { RepositoryFactory } from 'src/domain/factories';

@Injectable()
export class TypeRepository extends RepositoryFactory<
  TypeEntity,
  CreateTypeDto,
  UpdateTypeDto
> {
  constructor() {
    super('type');
  }

  findByName(name: string): Promise<TypeEntity> {
    return this.prismaService.type.findFirst({
      where: {
        name,
      },
    });
  }
}
