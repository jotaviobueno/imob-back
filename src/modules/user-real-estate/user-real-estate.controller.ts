import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { UserRealEstateService } from './user-real-estate.service';
import {
  CreateUserRealEstateDto,
  QueryParamsDto,
  UpdateUserRealEstateDto,
} from 'src/domain/dtos';
import { RoleGuard } from '../role/guards';
import { Roles } from '../role/decorators';
import { ROLE_ENUM } from 'src/domain/enums';

@Controller('user-real-estate')
@UseGuards(RoleGuard)
@Roles(ROLE_ENUM.ADMIN, ROLE_ENUM.DEV)
export class UserRealEstateController {
  constructor(private readonly userRealEstateService: UserRealEstateService) {}

  @Post()
  create(@Body() createUserRealEstateDto: CreateUserRealEstateDto) {
    return this.userRealEstateService.create(createUserRealEstateDto);
  }

  @Get()
  findAll(@Query() queryParamsDto: QueryParamsDto) {
    return this.userRealEstateService.findAll(queryParamsDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userRealEstateService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserRealEstateDto: UpdateUserRealEstateDto,
  ) {
    return this.userRealEstateService.update({
      ...updateUserRealEstateDto,
      id,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userRealEstateService.remove(id);
  }
}
