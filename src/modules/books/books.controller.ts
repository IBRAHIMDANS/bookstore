import { Body, Controller, Delete, Get, Param, Post, ValidationPipe } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';

@Controller('books')
export class BooksController {
  constructor(private bookService: BooksService) {}

  @Get()
  findAll() {
    return this.bookService.findAll();
  }

  @Get('/:id')
  findById(@Param('id') id: string) {
    return this.bookService.findById(id);
  }

  @Post()
  create(@Body(ValidationPipe) book: CreateBookDto) {
    return this.bookService.create(book);
  }

  @Delete('/:id')
  delete(@Param('id') id: string) {
    return this.bookService.delete(id);
  }
}
