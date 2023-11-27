import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TypeService } from './type.service';
import { CreateTypeDto, QueryParamsDto, UpdateTypeDto } from 'src/domain/dtos';
import { RoleGuard } from '../role/guards';
import { Permissions } from '../permission/decorators';
import { PERMISSION_ENUM } from 'src/domain/enums';

@Controller('type')
@UseGuards(RoleGuard)
export class TypeController {
  constructor(private readonly typeService: TypeService) {}

  @Post()
  @Permissions(PERMISSION_ENUM.CAN_CREATE_TYPE)
  create(@Body() createTypeDto: CreateTypeDto) {
    return this.typeService.create(createTypeDto);
  }

  @Get()
  @Permissions(PERMISSION_ENUM.CAN_READ_TYPE)
  findAll(@Query() queryParamsDto: QueryParamsDto) {
    return this.typeService.findAll(queryParamsDto);
  }

  @Get(':id')
  @Permissions(PERMISSION_ENUM.CAN_READ_TYPE)
  findOne(@Param('id') id: string) {
    return this.typeService.findOne(id);
  }

  @Patch(':id')
  @Permissions(PERMISSION_ENUM.CAN_UPDATE_TYPE)
  update(@Param('id') id: string, @Body() updateTypeDto: UpdateTypeDto) {
    return this.typeService.update({ ...updateTypeDto, id });
  }

  @Delete(':id')
  @Permissions(PERMISSION_ENUM.CAN_DELETE_TYPE)
  remove(@Param('id') id: string) {
    return this.typeService.remove(id);
  }
}
