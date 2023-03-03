import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { AuthorsService } from '@/modules/authors/authors.service';
import { GenresService } from '@/modules/genres/genres.service';

@Injectable()
export class BooksService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly authorsService: AuthorsService,
    private readonly genresService: GenresService,
  ) {}

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

  async findOrCreate(book: CreateBookDto) {
    const bookFound = await this.prisma.book.findUnique({
      where: {
        title_publicationYear_language: {
          title: book.title,
          language: book.language,
          publicationYear: book.publicationYear,
        },
      },
    });
    if (bookFound) {
      throw new HttpException('Book already exists', 400);
    }
    return await this.create(book);
  }

  async create(book: CreateBookDto) {
    try {
      const authors = await this.authorsService.findOrCreate(book.authors);
      const genres = await this.genresService.findOrCreate(book.genres);

      return await this.prisma.book.create({
        data: {
          ...book,
          genres: {
            connect: genres.map(genre => ({ id: genre.id })),
          },
          authors: {
            connect: authors.map(author => ({ id: author.id })),
          },
        },
        include: { authors: true, genres: true },
      });
    } catch (e) {
      console.log(e.message);
      throw new BadRequestException('Error book not created   ', e.message);
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
