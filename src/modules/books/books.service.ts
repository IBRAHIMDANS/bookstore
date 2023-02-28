import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { PrismaService } from '@/modules/prisma/prisma.service';

@Injectable()
export class BooksService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.book.findMany();
  }

  async findById(id: string) {
    const book = await this.prisma.book.findUnique({ where: { id } });
    if (!book) {
      throw new NotFoundException('Book not found');
    }
    return book;
  }

  async create(book: CreateBookDto) {
    try {
      return await this.prisma.book.create({ data: book });
    } catch (e) {
      throw new UnauthorizedException('Error Book not created');
    }
  }

  async delete(id: string) {
    const book = await this.findById(id);

    try {
      await this.prisma.book.delete({ where: { id: book.id } });
    } catch (e) {
      throw new UnauthorizedException('Error Book not deleted');
    }
  }
}
