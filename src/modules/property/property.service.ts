import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ServiceBase } from 'src/domain/bases';
import {
  CreatePropertyDto,
  QueryParamsDto,
  UpdatePropertyDto,
} from 'src/domain/dtos';
import { IFindMany, PropertyEntity } from 'src/domain/entities';
import { TypeService } from '../type/type.service';
import { AddressService } from '../address/address.service';
import { S3Service } from '../s3/s3.service';
import { PropertyRepository } from 'src/repositories/property';
import { RealEstateService } from '../real-estate/real-estate.service';
import { QueryBuilder, isMongoId } from 'src/domain/utils';

@Injectable()
export class PropertyService
  implements
    Partial<ServiceBase<PropertyEntity, CreatePropertyDto, UpdatePropertyDto>>
{
  constructor(
    private readonly propertyRepository: PropertyRepository,
    private readonly typeService: TypeService,
    private readonly realEstateService: RealEstateService,
    private readonly addressService: AddressService,
    private readonly s3Service: S3Service,
  ) {}

  async create({
    files,
    ...dto
  }: CreatePropertyDto & {
    files?: Express.Multer.File[];
  }): Promise<PropertyEntity> {
    const realEstate = await this.realEstateService.findOne(dto.realEstateId);

    const type = await this.typeService.findOne(dto.typeId);

    const address = await this.addressService.findOne(dto.addressId);

    const images =
      files &&
      (await this.s3Service.uploadManyFiles(
        files.map((file) => ({
          ...file,
          bucket: 'imobproject',
          path: 'property',
        })),
      ));

    const property = await this.propertyRepository.create({
      ...dto,
      images,
      addressId: address.id,
      realEstateId: realEstate.id,
      typeId: type.id,
    });

    return property;
  }

  async update({
    files,
    id,
    ...dto
  }: UpdatePropertyDto & {
    files?: Express.Multer.File[];
  }): Promise<PropertyEntity> {
    const property = await this.findOne(id);

    if (dto.typeId) await this.typeService.findOne(dto.typeId);

    if (dto.addressId) await this.addressService.findOne(dto.addressId);

    if (dto.realEstateId)
      await this.realEstateService.findOne(dto.realEstateId);

    const images =
      files &&
      (await this.s3Service.uploadManyFiles(
        files.map((file) => ({
          ...file,
          bucket: 'imobproject',
          path: 'property',
        })),
      ));

    const update = await this.propertyRepository.update({
      ...dto,
      id: property.id,
      images,
    });

    if (!update)
      throw new HttpException('Failed to update', HttpStatus.NOT_ACCEPTABLE);

    return update;
  }

  async findAll(
    queryParams: QueryParamsDto,
  ): Promise<IFindMany<PropertyEntity>> {
    const query = new QueryBuilder(queryParams).handle();

    const data = await this.propertyRepository.findAll(query);
    const total = await this.propertyRepository.count();

    return { data, total };
  }

  async findOne(id: string): Promise<PropertyEntity> {
    if (!isMongoId(id))
      throw new HttpException(
        'Id sent its not mongo id',
        HttpStatus.BAD_REQUEST,
      );

    const property = await this.propertyRepository.findById(id);

    if (!property)
      throw new HttpException('property not found', HttpStatus.NOT_FOUND);

    return property;
  }

  async remove(id: string): Promise<boolean> {
    const property = await this.findOne(id);

    const remove = await this.propertyRepository.destroy(property.id);

    if (!remove)
      throw new HttpException('Failed to remove', HttpStatus.NOT_ACCEPTABLE);

    return true;
  }
}
