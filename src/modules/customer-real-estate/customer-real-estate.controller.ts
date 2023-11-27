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
import { CustomerRealEstateService } from './customer-real-estate.service';
import {
  CreateCustomerRealEstateDto,
  QueryParamsDto,
  UpdateCustomerRealEstateDto,
} from 'src/domain/dtos';

@Controller('customer-real-estate')
export class CustomerRealEstateController {
  constructor(
    private readonly customerRealEstateService: CustomerRealEstateService,
  ) {}

  @Post()
  create(@Body() createCustomerRealEstateDto: CreateCustomerRealEstateDto) {
    return this.customerRealEstateService.create(createCustomerRealEstateDto);
  }

  @Get()
  findAll(@Query() queryParamsDto: QueryParamsDto) {
    return this.customerRealEstateService.findAll(queryParamsDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customerRealEstateService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCustomerRealEstateDto: UpdateCustomerRealEstateDto,
  ) {
    return this.customerRealEstateService.update({
      ...updateCustomerRealEstateDto,
      id,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customerRealEstateService.remove(id);
  }
}
