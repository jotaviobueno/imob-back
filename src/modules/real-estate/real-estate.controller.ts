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
} from '@nestjs/common';
import { RealEstateService } from './real-estate.service';
import {
  CreateRealEstateDto,
  QueryParamsDto,
  UpdateRealEstateDto,
} from 'src/domain/dtos';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('real-estate')
export class RealEstateController {
  constructor(private readonly realEstateService: RealEstateService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('files', 5))
  create(
    @Body() createRealEstateDto: CreateRealEstateDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    return this.realEstateService.create({ ...createRealEstateDto, files });
  }

  @Get()
  findAll(@Query() queryParamsDto: QueryParamsDto) {
    return this.realEstateService.findAll(queryParamsDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.realEstateService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(FilesInterceptor('files', 5))
  update(
    @Param('id') id: string,
    @Body() updateRealEstateDto: UpdateRealEstateDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    return this.realEstateService.update({ id, files, ...updateRealEstateDto });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.realEstateService.softDelete(id);
  }
}
