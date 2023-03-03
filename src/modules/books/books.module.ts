import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { PrismaService } from '../prisma/prisma.service';
import { AuthModule } from '@/modules/auth/auth.module';
import { AuthorsService } from '@/modules/authors/authors.service';
import { GenresService } from '@/modules/genres/genres.service';

@Module({
  imports: [AuthModule],
  controllers: [BooksController],
  providers: [BooksService, PrismaService, AuthorsService, GenresService],
})
export class BooksModule {}
