import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards, ValidationPipe } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { ApiConflictResponse, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UpdateBookDto } from '@/modules/books/dto/update-book.dto';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { Book } from '@prisma/client';
import { AdminGuard } from '@/modules/auth/guards/admin.auth.guard';
import { QueryBookDto } from '@/modules/books/dto/query.book.dto';

@ApiTags('books')
@Controller('books')
export class BooksController {
  constructor(private bookService: BooksService) {}

  @ApiCreatedResponse({ description: 'Book created successfully' })
  @ApiConflictResponse()
  @ApiOperation({ operationId: 'create' })
  @Get()
  findAll(@Query() query: QueryBookDto) {
    return this.bookService.findAll(query);
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
  createBook(@Body(ValidationPipe) book: CreateBookDto) {
    return this.bookService.findOrCreate(book);
  }

  // @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiOperation({ operationId: 'update' })
  @ApiCreatedResponse({ description: 'Book updated' })
  @ApiConflictResponse()
  @Patch(':id')
  updateBookById(@Body() book: UpdateBookDto, @Param('id') id: string) {
    return this.bookService.updateBookById({ id, book });
  }

  // @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiOperation({ operationId: 'delete' })
  @ApiCreatedResponse({ status: 204, description: 'Book deleted successfully' })
  @ApiConflictResponse()
  @Delete(':id')
  deleteBookById(@Param('id') id: string) {
    return this.bookService.deleteBookById(id);
  }
}
