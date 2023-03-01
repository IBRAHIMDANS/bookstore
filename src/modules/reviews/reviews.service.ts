import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { BooksService } from '@/modules/books/books.service';
import { Review, User } from '@prisma/client';

@Injectable()
export class ReviewsService {
  constructor(private readonly bookService: BooksService, private readonly prisma: PrismaService) {}

  async findByIdWhereOwned(id: string, user: User): Promise<Review> {
    const review = await this.findOne(id);
    if (review.userId !== user.id) {
      throw new UnauthorizedException('You are not authorized to delete this review');
    }
    return review;
  }

  async create(review: CreateReviewDto, user: User) {
    const bookId = review.bookId;
    await this.bookService.findById(bookId);
    return await this.prisma.review.create({
      data: {
        ...review,
        userId: user.id,
      },
    });
  }

  async findAll(query, user: User) {
    const { bookId } = query;
    return this.prisma.review.findMany({
      where: {
        userId: user.id,
        bookId: bookId,
      },
    });
  }

  async findOne(id: string): Promise<Review> {
    const review = this.prisma.review.findUnique({
      where: {
        id,
      },
    });
    if (!review) {
      throw new NotFoundException('Review not found');
    }
    return review;
  }

  async update(id: string, updateReviewDto: UpdateReviewDto, user: User) {
    const review = await this.findByIdWhereOwned(id, user);
    if (review.bookId !== updateReviewDto.bookId) {
      throw new NotFoundException('Book not found');
    }

    return this.prisma.review.update({
      where: {
        id,
      },
      data: {
        ...updateReviewDto,
      },
    });
  }

  async remove(id: string, user: User): Promise<void> {
    await this.findByIdWhereOwned(id, user);
    await this.prisma.review.delete({
      where: {
        id,
      },
    });
  }
}
