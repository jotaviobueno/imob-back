import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PersonService } from './person.service';
import { QueryParamsDto, UpdatePersonDto } from '../../domain/dtos';
import { RoleGuard } from '../role/guards';
import { Permissions } from '../permission/decorators';
import { PERMISSION_ENUM, ROLE_ENUM } from 'src/domain/enums';
import { Roles } from '../role/decorators';

@Controller('person')
@UseGuards(RoleGuard)
@Roles(ROLE_ENUM.ADMIN, ROLE_ENUM.DEV)
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  @Get()
  @Permissions(PERMISSION_ENUM.CAN_READ_PERSON)
  findAll(@Query() queryParamsDto: QueryParamsDto) {
    return this.personService.findAll(queryParamsDto);
  }

  @Get(':id')
  @Permissions(PERMISSION_ENUM.CAN_READ_PERSON)
  findOne(@Param('id') id: string) {
    return this.personService.findOne(id);
  }

  @Patch(':id')
  @Permissions(PERMISSION_ENUM.CAN_UPDATE_PERSON)
  update(@Param('id') id: string, @Body() updatePersonDto: UpdatePersonDto) {
    return this.personService.update({ ...updatePersonDto, id });
  }
}
