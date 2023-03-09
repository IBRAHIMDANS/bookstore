import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '@/modules/prisma/prisma.service';

@Injectable()
export class GenresService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.genre.findMany();
  }

  async findById(id: string) {
    const genre = await this.prisma.genre.findUnique({ where: { id } });
    if (!genre) {
      throw new NotFoundException('Genre not found');
    }
    return genre;
  }

  async findOrCreate(genres: string[]) {
    await Promise.all(
      genres.map(async genre => {
        const existingGenre = await this.prisma.genre.findFirst({ where: { name: genre } });
        if (!existingGenre) {
          await this.create(genre);
        }
      }),
    );
    return await Promise.all(
      genres.map(async genre => {
        return await this.prisma.genre.findFirst({
          where: {
            name: genre,
          },
        });
      }),
    );
  }

  async create(name: string) {
    try {
      return await this.prisma.genre.create({
        data: {
          name,
        },
      });
    } catch (e) {
      throw new UnauthorizedException('Error Genre not created');
    }
  }
}
