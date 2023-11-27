import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ServiceBase } from 'src/domain/bases';
import {
  CreateUserRealEstateDto,
  QueryParamsDto,
  UpdateUserRealEstateDto,
} from 'src/domain/dtos';
import { UserRealEstateEntity } from 'src/domain/entities/user-real-estate';
import { RealEstateService } from '../real-estate/real-estate.service';
import { UserService } from '../user/user.service';
import { IFindMany } from 'src/domain/entities';
import { UserRealEstateRepository } from 'src/repositories/user-real-estate';
import { QueryBuilder, isMongoId } from 'src/domain/utils';

@Injectable()
export class UserRealEstateService
  implements
    Partial<
      ServiceBase<
        UserRealEstateEntity,
        CreateUserRealEstateDto,
        UpdateUserRealEstateDto
      >
    >
{
  constructor(
    private readonly realEstateService: RealEstateService,
    private readonly userService: UserService,
    private readonly userRealEstateRepository: UserRealEstateRepository,
  ) {}

  async create(dto: CreateUserRealEstateDto): Promise<UserRealEstateEntity> {
    const user = await this.userService.findOne(dto.userId);

    const realEstate = await this.realEstateService.findOne(dto.realEstateId);

    const userAlreadyInThisRealEstate =
      await this.userRealEstateRepository.findByUserIdAndRealEstateId(
        user.id,
        realEstate.id,
      );

    if (userAlreadyInThisRealEstate)
      throw new HttpException(
        'this user already in this real estate',
        HttpStatus.CONFLICT,
      );

    const userRealEstate = await this.userRealEstateRepository.create(dto);

    return userRealEstate;
  }

  async findOne(id: string): Promise<UserRealEstateEntity> {
    if (!isMongoId(id))
      throw new HttpException(
        'Id sent its not mongo id',
        HttpStatus.BAD_REQUEST,
      );

    const userRealEstate = await this.userRealEstateRepository.findById(id);

    if (!userRealEstate)
      throw new HttpException(
        'user real estate not found',
        HttpStatus.NOT_FOUND,
      );

    return userRealEstate;
  }

  async findAll(
    queryParams: QueryParamsDto,
  ): Promise<IFindMany<UserRealEstateEntity>> {
    const query = new QueryBuilder(queryParams).handle();

    const data = await this.userRealEstateRepository.findAll(query);
    const total = await this.userRealEstateRepository.count();

    return { data, total };
  }

  async update(dto: UpdateUserRealEstateDto): Promise<UserRealEstateEntity> {
    const userRealEstate = await this.findOne(dto.id);

    if (dto.userId) {
      const user = await this.userService.findOne(dto.userId);

      const userAlreadyExistInRealEstate =
        await this.userRealEstateRepository.findByUserIdAndRealEstateId(
          user.id,
          userRealEstate.realEstateId,
        );

      if (userAlreadyExistInRealEstate)
        throw new HttpException(
          'user already exist in this real estate',
          HttpStatus.CONFLICT,
        );
    }

    if (dto.realEstateId) {
      const realEstate = await this.realEstateService.findOne(dto.realEstateId);

      const realEstateAlreadyExistInUser =
        await this.userRealEstateRepository.findByUserIdAndRealEstateId(
          userRealEstate.userId,
          realEstate.id,
        );

      if (realEstateAlreadyExistInUser)
        throw new HttpException(
          'real estate already exist in this user',
          HttpStatus.CONFLICT,
        );
    }

    const update = await this.userRealEstateRepository.update({
      ...dto,
      id: userRealEstate.id,
    });

    if (!update)
      throw new HttpException('Failed to update', HttpStatus.NOT_ACCEPTABLE);

    return update;
  }

  async remove(id: string): Promise<boolean> {
    const userRealEstate = await this.findOne(id);

    const remove = await this.userRealEstateRepository.destroy(
      userRealEstate.id,
    );

    if (!remove)
      throw new HttpException('Failed to remove', HttpStatus.NOT_ACCEPTABLE);

    return true;
  }
}
