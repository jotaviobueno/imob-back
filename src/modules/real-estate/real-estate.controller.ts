import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
  Query,
  UseGuards,
} from '@nestjs/common';
import { RealEstateService } from './real-estate.service';
import {
  CreateRealEstateDto,
  QueryParamsDto,
  UpdateRealEstateDto,
} from 'src/domain/dtos';
import { FilesInterceptor } from '@nestjs/platform-express';
import { RoleGuard } from '../role/guards';
import { Permissions } from '../permission/decorators';
import { PERMISSION } from 'src/domain/enums';

@Controller('real-estate')
@UseGuards(RoleGuard)
export class RealEstateController {
  constructor(private readonly realEstateService: RealEstateService) {}

  @Post()
  @Permissions(PERMISSION.CAN_CREATE_REAL_ESTATE)
  @UseInterceptors(FilesInterceptor('files', 5))
  create(
    @Body() createRealEstateDto: CreateRealEstateDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    return this.realEstateService.create({ ...createRealEstateDto, files });
  }

  @Get()
  @Permissions(PERMISSION.CAN_READ_REAL_ESTATE)
  findAll(@Query() queryParamsDto: QueryParamsDto) {
    return this.realEstateService.findAll(queryParamsDto);
  }

  @Get(':id')
  @Permissions(PERMISSION.CAN_READ_REAL_ESTATE)
  findOne(@Param('id') id: string) {
    return this.realEstateService.findOne(id);
  }

  @Patch(':id')
  @Permissions(PERMISSION.CAN_UPDATE_REAL_ESTATE)
  @UseInterceptors(FilesInterceptor('files', 5))
  update(
    @Param('id') id: string,
    @Body() updateRealEstateDto: UpdateRealEstateDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    return this.realEstateService.update({ id, files, ...updateRealEstateDto });
  }

  @Delete(':id')
  @Permissions(PERMISSION.CAN_DELETE_REAL_ESTATE)
  remove(@Param('id') id: string) {
    return this.realEstateService.softDelete(id);
  }
}
