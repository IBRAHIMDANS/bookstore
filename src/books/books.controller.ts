import { Body, Controller, Delete, Get, Param, Post, ValidationPipe } from "@nestjs/common";
import { BooksService } from "./books.service";
import { CreateBookDTO } from "./dto/createBookDTO";

@Controller("books")
export class BooksController {
  constructor(private bookService: BooksService) {}

  @Get()
  findAll() {
    return this.bookService.findAll();
  }

  @Get("/:id")
  findById(@Param("id") id: number) {
    return this.bookService.findById(id);
  }

  @Post()
  create(@Body(ValidationPipe) book: CreateBookDTO) {
    return this.bookService.create(book);
  }

  @Delete()
  delete(@Param("id") id: number) {
    return this.bookService.delete(id);
  }
}
