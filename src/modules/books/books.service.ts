import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDTO } from './dto/createBookDTO';
import { PrismaService } from '@/modules/prisma/prisma.service';

@Injectable()
export class BooksService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.book.findMany();
  }

  async findById(id: number) {
    const book = await this.prisma.book.findUnique({ where: { id: Number(id) } });
    console.log('ici book', book);
    if (!book) {
      throw new NotFoundException('Book not found');
    }
    return book;
  }

  async create(book: CreateBookDTO) {
    return await this.prisma.book.create({ data: book });
  }

  async delete(id: number) {
    const book = await this.findById(id);

    await this.prisma.book.delete({ where: { id: book.id } });
  }
}
