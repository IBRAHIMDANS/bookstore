import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ShelvesService } from './shelves.service';
import { CreateShelfDto } from './dto/create-shelf.dto';
import { UpdateShelfDto } from './dto/update-shelf.dto';

@Controller('shelves')
export class ShelvesController {
  constructor(private readonly shelvesService: ShelvesService) {}

  @Post()
  createShelf(@Body() createShelfDto: CreateShelfDto) {
    return this.shelvesService.createShelf(createShelfDto);
  }

  @Get()
  findAll() {
    return this.shelvesService.findAllShelves();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.shelvesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateShelfDto: UpdateShelfDto) {
    return this.shelvesService.update(+id, updateShelfDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.shelvesService.remove(+id);
  }
}
