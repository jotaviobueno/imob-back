import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ServiceBase } from 'src/domain/bases';
import { CreateUserDto, QueryParamsDto, UpdateUserDto } from 'src/domain/dtos';
import { IFindMany, UserEntity } from 'src/domain/entities';
import { UserRepository } from 'src/repositories/user';
import { PersonService } from '../person/person.service';
import { QueryBuilder, generatePath, hash, isMongoId } from 'src/domain/utils';
import { S3Service } from '../s3/s3.service';

@Injectable()
export class UserService
  implements
    Partial<
      ServiceBase<Omit<UserEntity, 'password'>, CreateUserDto, UpdateUserDto>
    >
{
  constructor(
    private readonly userRepository: UserRepository,
    private readonly personService: PersonService,
    private readonly s3Service: S3Service,
  ) {}

  async create({
    password: passwordValue,
    file,
    ...dto
  }: CreateUserDto & { file?: Express.Multer.File }): Promise<
    Omit<UserEntity, 'password'>
  > {
    const phoneAlreadyExist = await this.personService.findByPhone(dto.phone);

    if (phoneAlreadyExist)
      throw new HttpException('this phone already exist', HttpStatus.CONFLICT);

    const cpfAlreadyExist = await this.personService.findByCpf(dto.cpf);

    if (cpfAlreadyExist)
      throw new HttpException('this cpf already exist', HttpStatus.CONFLICT);

    const emailAlreadyExist = await this.personService.findByEmail(dto.email);

    if (emailAlreadyExist)
      throw new HttpException('this email already exist', HttpStatus.CONFLICT);

    if (dto.rg) {
      const rgAlreadyExist = await this.personService.findByRg(dto.rg);

      if (rgAlreadyExist)
        throw new HttpException('this rg already exist', HttpStatus.CONFLICT);
    }

    const avatar =
      file &&
      (await this.s3Service.uploadSingleFile({
        bucket: 'imobproject',
        path: generatePath('user/avatar', file.mimetype),
        ...file,
      }));

    const person = await this.personService.create(dto);

    const passwordHashed = await hash(passwordValue);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...user } = await this.userRepository.create({
      password: passwordHashed,
      personId: person.id,
      avatar,
    });

    return user;
  }

  async findAll(
    queryParams: QueryParamsDto,
  ): Promise<IFindMany<Omit<UserEntity, 'password'>>> {
    const query = new QueryBuilder(queryParams).handle();

    const data = await this.userRepository.findAll(query);
    const total = await this.userRepository.count();

    return { data, total };
  }

  async findByEmail(email: string): Promise<UserEntity> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) throw new HttpException('Email not found', HttpStatus.NOT_FOUND);

    return user;
  }

  async findOne(
    id: string,
    returnPassword: boolean = false,
  ): Promise<Omit<UserEntity, 'password'> | UserEntity> {
    if (!isMongoId(id))
      throw new HttpException(
        'Id sent its not mongo id',
        HttpStatus.BAD_REQUEST,
      );

    const userInfo = await this.userRepository.findById(id);

    if (!userInfo)
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    const { password, ...user } = userInfo;

    if (returnPassword) return { ...user, password };

    return user;
  }

  async update({
    id,
    password: passwordValue,
    file,
    ...dto
  }: UpdateUserDto & { file?: Express.Multer.File }): Promise<
    Omit<UserEntity, 'password'>
  > {
    const updateUserDto = { id, password: passwordValue };

    if (dto.phone) {
      const phoneAlreadyExist = await this.personService.findByPhone(dto.phone);

      if (phoneAlreadyExist)
        throw new HttpException(
          'this phone already exist',
          HttpStatus.CONFLICT,
        );
    }

    if (dto.email) {
      const emailAlreadyExist = await this.personService.findByEmail(dto.email);

      if (emailAlreadyExist)
        throw new HttpException(
          'this email already exist',
          HttpStatus.CONFLICT,
        );
    }

    const user = await this.findOne(updateUserDto.id);

    if (updateUserDto.password)
      updateUserDto.password = await hash(updateUserDto.password);

    const avatar =
      file &&
      (await this.s3Service.uploadSingleFile({
        bucket: 'imobproject',
        path: generatePath('user/avatar', file.mimetype),
        ...file,
      }));

    if (dto)
      await this.personService.update({
        id: user.personId,
        avatar,
        ...dto,
      });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...update } =
      await this.userRepository.update(updateUserDto);

    if (!update)
      throw new HttpException('Failed to update', HttpStatus.NOT_ACCEPTABLE);

    return update;
  }

  async softDelete(id: string): Promise<boolean> {
    const user = await this.findOne(id);

    const remove = await this.userRepository.destroy(user.id);

    if (!remove)
      throw new HttpException('Failed to remove', HttpStatus.NOT_ACCEPTABLE);

    return true;
  }
}
