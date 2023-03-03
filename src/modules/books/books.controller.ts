import { Body, Controller, Delete, Get, Param, Post, ValidationPipe } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { ApiConflictResponse, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('books')
@Controller('books')
export class BooksController {
  constructor(private bookService: BooksService) {}

  @ApiCreatedResponse({ description: 'Book created successfully' })
  @ApiConflictResponse()
  @ApiOperation({ operationId: 'create' })
  @Get()
  findAll() {
    return this.bookService.findAll();
  }

  @ApiCreatedResponse({ description: 'Book found successfully' })
  @ApiConflictResponse()
  @ApiOperation({ operationId: 'findById' })
  @Get(':id')
  findById(@Param('id') id: string) {
    return this.bookService.findById(id);
  }

  @ApiOperation({ operationId: 'create' })
  @ApiCreatedResponse({ description: 'Book created successfully' })
  @ApiConflictResponse()
  @Post()
  create(@Body(ValidationPipe) book: CreateBookDto) {
    return this.bookService.findOrCreate(book);
  }

  @ApiOperation({ operationId: 'delete' })
  @ApiCreatedResponse({ description: 'Book deleted successfully' })
  @ApiConflictResponse()
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.bookService.delete(id);
  }
}
