import { QueryParamsDto } from 'src/domain/dtos';
import { IFindMany } from 'src/domain/entities';

export abstract class ServiceBase<K, T = void, J = void> {
  abstract createMany(dto: T[]): Promise<unknown>;
  abstract create(dto: T): Promise<K>;
  abstract findOne(id: string): Promise<K>;
  abstract findManyWithIds(ids: string[]): Promise<K[]>;
  abstract findAll(queryParams: QueryParamsDto): Promise<IFindMany<K>>;
  abstract update(dto: J): Promise<K>;
  abstract softDelete(id: string): Promise<boolean>;
  abstract remove(id: string): Promise<boolean>;
}
