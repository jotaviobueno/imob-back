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
import { CustomerPropertyService } from './customer-property.service';
import {
  CreateCustomerPropertyDto,
  QueryParamsDto,
  UpdateCustomerPropertyDto,
} from 'src/domain/dtos';

@Controller('customer-property')
export class CustomerPropertyController {
  constructor(
    private readonly customerPropertyService: CustomerPropertyService,
  ) {}

  @Post()
  create(@Body() createCustomerPropertyDto: CreateCustomerPropertyDto) {
    return this.customerPropertyService.create(createCustomerPropertyDto);
  }

  @Get()
  findAll(@Query() queryParamsDto: QueryParamsDto) {
    return this.customerPropertyService.findAll(queryParamsDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customerPropertyService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCustomerPropertyDto: UpdateCustomerPropertyDto,
  ) {
    return this.customerPropertyService.update({
      ...updateCustomerPropertyDto,
      id,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customerPropertyService.remove(id);
  }
}
