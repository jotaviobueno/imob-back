import { Controller, Get, Body, Patch, Param, Query } from '@nestjs/common';
import { PersonService } from './person.service';
import { QueryParamsDto, UpdatePersonDto } from '../../domain/dtos';

// TODO: DEIXAR ISSO PRIVADO COM BASE DE RELO
@Controller('person')
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  @Get()
  findAll(@Query() queryParamsDto: QueryParamsDto) {
    return this.personService.findAll(queryParamsDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.personService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePersonDto: UpdatePersonDto) {
    return this.personService.update({ ...updatePersonDto, id });
  }
}
