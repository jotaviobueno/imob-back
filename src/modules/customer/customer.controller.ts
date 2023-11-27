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
import { CustomerService } from './customer.service';
import {
  CreateCustomerDto,
  QueryParamsDto,
  UpdateCustomerDto,
} from 'src/domain/dtos';
import { RoleGuard } from '../role/guards';
import { Permissions } from '../permission/decorators';
import { PERMISSION } from 'src/domain/enums';

@Controller('customer')
@UseGuards(RoleGuard)
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  @Permissions(PERMISSION.CAN_CREATE_CUSTOMER)
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customerService.create(createCustomerDto);
  }

  @Get()
  @Permissions(PERMISSION.CAN_READ_CUSTOMER)
  findAll(@Query() queryParamsDto: QueryParamsDto) {
    return this.customerService.findAll(queryParamsDto);
  }

  @Get(':id')
  @Permissions(PERMISSION.CAN_READ_CUSTOMER)
  findOne(@Param('id') id: string) {
    return this.customerService.findOne(id);
  }

  @Patch(':id')
  @Permissions(PERMISSION.CAN_UPDATE_CUSTOMER)
  update(
    @Param('id') id: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    return this.customerService.update({ ...updateCustomerDto, id });
  }

  @Delete(':id')
  @Permissions(PERMISSION.CAN_DELETE_CUSTOMER)
  remove(@Param('id') id: string) {
    return this.customerService.remove(id);
  }
}
