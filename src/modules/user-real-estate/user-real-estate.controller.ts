import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { UserRealEstateService } from './user-real-estate.service';
import {
  CreateUserRealEstateDto,
  QueryParamsDto,
  UpdateUserRealEstateDto,
} from 'src/domain/dtos';

@Controller('user-real-estate')
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
