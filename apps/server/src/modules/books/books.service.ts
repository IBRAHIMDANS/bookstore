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
import { UpdateBookDto } from '@/modules/books/dto/update-book.dto';
import { QueryBookDto } from '@/modules/books/dto/query.book.dto';

@Injectable()
export class BooksService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly authorsService: AuthorsService,
    private readonly genresService: GenresService,
  ) {}
  private includesAuthorsAndGenresAndReviews() {
    return {
      include: {
        authors: {
          select: { firstName: true, lastName: true, fullName: true },
        },
        genres: {
          select: { name: true },
        },
        reviews: true,
      },
    };
  }

  async findAll(query: QueryBookDto) {
    const { page = 1, limit = 10, sortingMethod, search = '', language } = query;
    try {
      return await this.prisma.book.findMany({
        where: {
          OR: [
            { title: { contains: search, mode: 'insensitive' } },
            { description: { contains: search, mode: 'insensitive' } },
            { language: { contains: search, mode: 'insensitive' } },
            { authors: { some: { fullName: { contains: search, mode: 'insensitive' } } } },
            { genres: { some: { name: { contains: search, mode: 'insensitive' } } } },
          ],
          language: { contains: language, mode: 'insensitive' },
        },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: {
          title: sortingMethod === 'ASC' ? 'asc' : 'desc',
        },
        ...this.includesAuthorsAndGenresAndReviews(),
      });
    } catch (e: any) {
      throw new BadRequestException(e);
    }
  }

  async findById(id: string) {
    const book = await this.prisma.book.findUnique({ where: { id }, ...this.includesAuthorsAndGenresAndReviews() });
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
      const bookData: any = {
        ...book,
        genres: {
          set: [],
          connect: genres.map(({ id }) => ({ id })),
        },
        authors: {
          set: [],
          connect: authors.map(({ id }) => ({ id })),
        },
      };
      return await this.prisma.book.create({
        data: {
          ...bookData,
        },
        include: { authors: true, genres: true },
      });
    } catch (e) {
      if (e.code === 'P2002') {
        throw new BadRequestException('Error book not created   ', 'Book already exists');
      }
      throw new UnauthorizedException('Error book not created   ', e.message);
    }

    return 'book updated';
  }

  async updateBookById({ id, book }: { book: UpdateBookDto; id: string }) {
    await this.findById(id);
    const bookData: any = book;
    if (book.authors) {
      const authors = await this.authorsService.findOrCreate(book.authors);
      bookData.authors = {
        set: [],
        connect: authors.map(author => ({ id: author.id })),
      };
    }
    if (book.genres) {
      const genres = await this.genresService.findOrCreate(book.genres);
      bookData.genres = {
        set: [],
        connect: genres.map(genre => ({ id: genre.id })),
      };
    }
    try {
      await this.prisma.book.update({
        where: { id },
        data: {
          ...bookData,
        },
        include: { authors: true, genres: true },
      });
    } catch (e) {
      throw new UnauthorizedException(e, e.message);
    }

    return 'book updated';
  }

  async deleteBookById(id: string) {
    const book = await this.findById(id);

    try {
      await this.prisma.book.delete({ where: { id: book.id } });
    } catch (e) {
      throw new UnauthorizedException('Error Book not deleted');
    }
    return {
      message: 'Book deleted',
    };
  }
}
