import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
  UploadedFiles,
  UseGuards,
} from '@nestjs/common';
import { PropertyService } from './property.service';
import {
  CreatePropertyDto,
  QueryParamsDto,
  UpdatePropertyDto,
} from 'src/domain/dtos';
import { FilesInterceptor } from '@nestjs/platform-express';
import { RoleGuard } from '../role/guards';
import { Permissions } from '../permission/decorators';
import { PERMISSION_ENUM } from 'src/domain/enums';

@Controller('property')
@UseGuards(RoleGuard)
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('files', 10))
  @Permissions(PERMISSION_ENUM.CAN_CREATE_PROPERTY)
  create(
    @Body() createPropertyDto: CreatePropertyDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    return this.propertyService.create({
      ...createPropertyDto,
      files,
    });
  }

  @Get()
  @Permissions(PERMISSION_ENUM.CAN_READ_PROPERTY)
  findAll(@Query() queryParamsDto: QueryParamsDto) {
    return this.propertyService.findAll(queryParamsDto);
  }

  @Get(':id')
  @Permissions(PERMISSION_ENUM.CAN_READ_PROPERTY)
  findOne(@Param('id') id: string) {
    return this.propertyService.findOne(id);
  }

  @Patch(':id')
  @Permissions(PERMISSION_ENUM.CAN_UPDATE_PROPERTY)
  @UseInterceptors(FilesInterceptor('files', 10))
  update(
    @Param('id') id: string,
    @Body() updatePropertyDto: UpdatePropertyDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    return this.propertyService.update({
      ...updatePropertyDto,
      id,
      files,
    });
  }

  @Delete(':id')
  @Permissions(PERMISSION_ENUM.CAN_DELETE_PROPERTY)
  remove(@Param('id') id: string) {
    return this.propertyService.remove(id);
  }
}
