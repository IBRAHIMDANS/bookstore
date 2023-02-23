import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDTO } from './dto/createBookDTO';

@Controller('books')
export class BooksController {
  constructor(private bookService: BooksService) {
  }

  @Get()
  findAll() {
    return this.bookService.findAll();
  }

  @Post()
  create(@Body(ValidationPipe) book: CreateBookDTO) {
    return this.bookService.create(book);
  }
}
