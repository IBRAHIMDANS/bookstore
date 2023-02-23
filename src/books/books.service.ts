import { Injectable } from '@nestjs/common';
import { Books } from './books.entity';
import { CreateBookDTO } from './dto/createBookDTO';

@Injectable()
export class BooksService {

  private books: Books[] = [
    {
      title: 'l\'etranger',
      author: 'Albert Camus',
    },
  ];

  findAll() {
    return this.books;
  }

  create(book: CreateBookDTO) {
    return this.books.push(book);
  }
}
