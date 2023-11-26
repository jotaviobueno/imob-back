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
import { AddressService } from './address.service';
import {
  CreateAddressDto,
  QueryParamsDto,
  UpdateAddressDto,
} from 'src/domain/dtos';
import { RoleGuard } from '../role/guards';
import { Permissions } from '../permission/decorators';
import { PERMISSION } from 'src/domain/enums';

@Controller('address')
@UseGuards(RoleGuard)
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  @Permissions(PERMISSION.CAN_CREATE_ADDRESS)
  create(@Body() createAddressDto: CreateAddressDto) {
    return this.addressService.create(createAddressDto);
  }

  @Get()
  @Permissions(PERMISSION.CAN_READ_ADDRESS)
  findAll(@Query() queryParamsDto: QueryParamsDto) {
    return this.addressService.findAll(queryParamsDto);
  }

  @Get(':id')
  @Permissions(PERMISSION.CAN_READ_ADDRESS)
  findOne(@Param('id') id: string) {
    return this.addressService.findOne(id);
  }

  @Patch(':id')
  @Permissions(PERMISSION.CAN_UPDATE_ADDRESS)
  update(@Param('id') id: string, @Body() updateAddressDto: UpdateAddressDto) {
    return this.addressService.update({ ...updateAddressDto, id });
  }

  @Delete(':id')
  @Permissions(PERMISSION.CAN_DELETE_ADDRESS)
  remove(@Param('id') id: string) {
    return this.addressService.softDelete(id);
  }
}
