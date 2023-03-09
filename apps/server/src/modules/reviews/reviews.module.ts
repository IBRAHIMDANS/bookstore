import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { BooksService } from '@/modules/books/books.service';
import { AuthorsService } from '@/modules/authors/authors.service';
import { GenresService } from '@/modules/genres/genres.service';

@Module({
  controllers: [ReviewsController],
  providers: [ReviewsService, PrismaService, BooksService, AuthorsService, GenresService],
})
export class ReviewsModule {}
