import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ServiceBase } from 'src/domain/bases';
import { CreateMenuDto, QueryParamsDto, UpdateMenuDto } from 'src/domain/dtos';
import { IFindMany, MenuEntity } from 'src/domain/entities';
import { QueryBuilder, isMongoId } from 'src/domain/utils';
import { MenuRepository } from 'src/repositories/menu';

@Injectable()
export class MenuService
  implements Partial<ServiceBase<MenuEntity, CreateMenuDto, UpdateMenuDto>>
{
  constructor(private readonly menuRepository: MenuRepository) {}

  create(dto: CreateMenuDto): Promise<MenuEntity> {
    return this.menuRepository.create(dto);
  }

  async findAll(queryParams: QueryParamsDto): Promise<IFindMany<MenuEntity>> {
    const query = new QueryBuilder(queryParams).handle();

    const data = await this.menuRepository.findAll(query);
    const total = await this.menuRepository.count();

    return { data, total };
  }

  async findOne(id: string): Promise<MenuEntity> {
    if (!isMongoId(id))
      throw new HttpException(
        'Id sent its not mongo id',
        HttpStatus.BAD_REQUEST,
      );

    const menu = await this.menuRepository.findById(id);

    if (!menu) throw new HttpException('menu not found', HttpStatus.NOT_FOUND);

    return menu;
  }

  async update(dto: UpdateMenuDto): Promise<MenuEntity> {
    const menu = await this.findOne(dto.id);

    const update = await this.menuRepository.update({ ...dto, id: menu.id });

    if (!update)
      throw new HttpException('Failed to update', HttpStatus.NOT_ACCEPTABLE);

    return update;
  }

  async remove(id: string): Promise<boolean> {
    const menu = await this.findOne(id);

    const remove = await this.menuRepository.destroy(menu.id);

    if (!remove)
      throw new HttpException('Failed to remove', HttpStatus.NOT_ACCEPTABLE);

    return true;
  }
}
