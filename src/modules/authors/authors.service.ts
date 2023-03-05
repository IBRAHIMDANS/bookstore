import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateAuthorDto } from '@/modules/authors/dto/create-author.dto';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { Author } from '@prisma/client';

@Injectable()
export class AuthorsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.author.findMany();
  }

  async findOrCreate(authors: CreateAuthorDto[]): Promise<CreateAuthorDto[]> {
    // Check if authors already exist in the database and create them if they don't
    // after that, return all authors from the database (including the ones that already existed)
    const promises = authors.map(async author => {
      const { firstName, lastName } = author;
      const existingAuthor = await this.prisma.author.findFirst({ where: { firstName, lastName } });
      if (!existingAuthor) {
        return this.create({ firstName, lastName });
      }
      return existingAuthor;
    });

    const results = await Promise.allSettled(promises);

    const createdAuthors = results
      .filter(
        (result: PromiseSettledResult<Author>): result is PromiseFulfilledResult<Author> =>
          result.status === 'fulfilled',
      )
      .map(result => result.value);

    return Promise.all(
      authors.map(async author => {
        const { firstName, lastName } = author;
        const existingAuthor = createdAuthors.find(
          createdAuthor => createdAuthor.firstName === firstName && createdAuthor.lastName === lastName,
        );
        if (existingAuthor) {
          return existingAuthor;
        }
        return this.prisma.author.findFirst({
          where: {
            firstName,
            lastName,
          },
        });
      }),
    );
  }

  async findById(id: string) {
    const author = await this.prisma.author.findUnique({ where: { id } });
    if (!author) {
      throw new NotFoundException('Author not found');
    }
    return author;
  }

  async create(author: CreateAuthorDto) {
    try {
      return await this.prisma.author.create({
        data: {
          ...author,
          ...(!author.fullName && { fullName: `${author.firstName} ${author.lastName}` }),
        },
      });
    } catch (e) {
      throw new UnauthorizedException('Error Author not created');
    }
  }
}
