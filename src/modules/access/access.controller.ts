import { Controller, Get, Post, Body } from '@nestjs/common';
import { AccessService } from './access.service';
import { CreateAccessDto } from 'src/domain/dtos';
import { UserEntity } from 'src/domain/entities';
import { IsPublic } from './decorators';
import { CurrentUser } from '../user/decorators';

@Controller('access')
export class AccessController {
  constructor(private readonly accessService: AccessService) {}

  @Post()
  @IsPublic()
  create(@Body() createAccessDto: CreateAccessDto) {
    return this.accessService.create(createAccessDto);
  }

  @Get('/who-am-i')
  whoAmI(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @CurrentUser() { password, ...user }: UserEntity,
  ): Omit<UserEntity, 'password'> {
    return user;
  }
}
