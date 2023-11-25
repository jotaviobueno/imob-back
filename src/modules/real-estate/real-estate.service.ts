import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  CreateRealEstateDto,
  QueryParamsDto,
  UpdateRealEstateDto,
} from 'src/domain/dtos';
import { RealEstateRepository } from 'src/repositories/real-estate';
import { S3Service } from '../s3/s3.service';
import { QueryBuilder, generatePath, isMongoId } from 'src/domain/utils';
import { IFindMany, RealEstateEntity } from 'src/domain/entities';
import { ServiceBase } from 'src/domain/bases';
import { AddressService } from '../address/address.service';

@Injectable()
export class RealEstateService
  implements
    Partial<
      ServiceBase<RealEstateEntity, CreateRealEstateDto, UpdateRealEstateDto>
    >
{
  constructor(
    private readonly realEstateRepository: RealEstateRepository,
    private readonly addressService: AddressService,
    private readonly s3Service: S3Service,
  ) {}

  async create({
    files,
    ...dto
  }: CreateRealEstateDto & {
    files: Array<Express.Multer.File>;
  }): Promise<RealEstateEntity> {
    const images = await this.s3Service.uploadManyFiles(
      files.map((file) => ({
        ...file,
        bucket: 'imobproject',
        path: generatePath('real-estate', file.mimetype),
      })),
    );

    const address = await this.addressService.findOne(dto.addressId);

    const realEstate = await this.realEstateRepository.create({
      images,
      addressId: address.id,
      ...dto,
    });

    return realEstate;
  }

  async findAll(
    queryParams: QueryParamsDto,
  ): Promise<IFindMany<RealEstateEntity>> {
    const query = new QueryBuilder(queryParams).handle();

    const data = await this.realEstateRepository.findAll(query);
    const total = await this.realEstateRepository.count();

    return { data, total };
  }

  async findOne(id: string): Promise<RealEstateEntity> {
    if (!isMongoId(id))
      throw new HttpException(
        'Id sent its not mongo id',
        HttpStatus.BAD_REQUEST,
      );

    const realEstate = await this.realEstateRepository.findById(id);

    if (!realEstate)
      throw new HttpException('real estate not found', HttpStatus.NOT_FOUND);

    return realEstate;
  }

  async update({
    id,
    files,
    ...dto
  }: UpdateRealEstateDto & {
    files?: Express.Multer.File[];
  }): Promise<RealEstateEntity> {
    const realEstate = await this.findOne(id);

    const images =
      files &&
      (await this.s3Service.uploadManyFiles(
        files.map((file) => ({
          ...file,
          bucket: 'imobproject',
          path: generatePath('real-estate', file.mimetype),
        })),
      ));

    if (dto.addressId) await this.addressService.findOne(dto.addressId);

    const update = await this.realEstateRepository.update({
      ...dto,
      id: realEstate.id,
      images,
    });

    if (!update)
      throw new HttpException('Failed to update', HttpStatus.NOT_ACCEPTABLE);

    return update;
  }

  async softDelete(id: string): Promise<boolean> {
    const realEstate = await this.findOne(id);

    const update = await this.realEstateRepository.softDelete(realEstate.id);

    if (!update)
      throw new HttpException('Failed to remove', HttpStatus.NOT_ACCEPTABLE);

    return true;
  }
}
