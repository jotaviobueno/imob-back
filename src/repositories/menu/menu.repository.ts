import { Injectable } from '@nestjs/common';
import { CreateMenuDto, UpdateMenuDto } from 'src/domain/dtos';
import { MenuEntity } from 'src/domain/entities';
import { RepositoryFactory } from 'src/domain/factories';

@Injectable()
export class MenuRepository extends RepositoryFactory<
  MenuEntity,
  CreateMenuDto,
  UpdateMenuDto
> {
  constructor() {
    super('menu');
  }

  findAll(query: any): Promise<MenuEntity[]> {
    return this.prismaService.menu.findMany({
      ...query,
      where: {
        deletedAt: null,
      },
    });
  }

  findById(id: string): Promise<MenuEntity> {
    return this.prismaService.menu.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });
  }
}
