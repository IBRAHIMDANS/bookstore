import { Injectable } from '@nestjs/common';
import { CreateShelfDto } from './dto/create-shelf.dto';
import { UpdateShelfDto } from './dto/update-shelf.dto';

@Injectable()
export class ShelvesService {
  createShelf(createShelfDto: CreateShelfDto) {
    return 'This action adds a new shelf';
  }

  findAllShelves() {
    return `This action returns all shelves`;
  }

  findOne(id: number) {
    return `This action returns a #${id} shelf`;
  }

  update(id: number, updateShelfDto: UpdateShelfDto) {
    return `This action updates a #${id} shelf`;
  }

  remove(id: number) {
    return `This action removes a #${id} shelf`;
  }
}
