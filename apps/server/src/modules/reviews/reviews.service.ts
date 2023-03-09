import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { BooksService } from '@/modules/books/books.service';
import { Review, User } from '@prisma/client';

@Injectable()
export class ReviewsService {
  constructor(private readonly bookService: BooksService, private readonly prisma: PrismaService) {}

  async findByIdWhereOwned(id: string, user: User): Promise<Review> {
    const review = await this.findById(id);
    if (review.userId !== user.id) {
      throw new UnauthorizedException('You are not authorized to delete this review');
    }
    return review;
  }

  async createReview(review: CreateReviewDto, user: User) {
    /// check if book exists
    await this.bookService.findById(review.bookId);
    try {
      return await this.prisma.review.create({
        data: {
          ...review,
          userId: user.id,
        },
        include: {
          book: true,
          user: true,
        },
      });
    } catch (e) {
      if (e.code === 'P2002') {
        throw new HttpException('Review already exists', 400);
      }
      if (e.code === 'P2025') {
        throw new HttpException('Book not found', 404);
      }
      if (e.code === 'P2014') {
        throw new HttpException('User not found', 404);
      }
      if (e.code === 'P2016' || e.code === 'P2003') {
        throw new HttpException('Invalid data', 400);
      }
      throw new BadRequestException(e);
    }
  }

  async findAll(query) {
    const { bookId } = query;
    const reviews = this.prisma.review.findMany({
      where: {
        bookId: bookId,
      },
      include: {
        user: true,
      },
    });
    const aggregate = await this.prisma.review.aggregate({
      where: {
        bookId: bookId,
      },
      _avg: {
        rating: true,
      },
      _count: true,
    });
    const ratings = aggregate._avg.rating;
    const count = aggregate._count;
    return { reviews, ratings, count };
  }

  async findById(id: string): Promise<Review> {
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

  async updateReview(id: string, updateReviewDto: UpdateReviewDto, user: User) {
    const review = await this.findByIdWhereOwned(id, user);
    if (review.bookId !== updateReviewDto.bookId) {
      throw new NotFoundException('Book not found');
    }
    return this.prisma.review.update({
      where: {
        bookId_userId: {
          bookId: review.bookId,
          userId: user.id,
        },
      },
      data: {
        ...updateReviewDto,
      },
      include: {
        book: true,
      },
    });
  }

  async removeReview(id: string, user: User): Promise<void> {
    await this.findByIdWhereOwned(id, user);
    await this.prisma.review.delete({
      where: {
        id,
      },
    });
  }
  async findMyReview(bookId: string, user: User) {
    try {
      return await this.prisma.review.findUnique({
        where: { bookId_userId: { bookId, userId: user.id } },
        include: { user: true },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new HttpException('Book not found', 404);
      }
      if (error.code === 'P2014') {
        throw new HttpException('User not found', 404);
      }
      return { review: null };
    }
  }

  findByBookId(bookId: string) {
    return this.prisma.review.findMany({
      where: {
        bookId: bookId,
      },
      include: {
        user: true,
      },
    });
  }

  findByUserId(userId: string) {
    return this.prisma.review.findMany({
      where: {
        userId: userId,
      },
      include: {
        book: true,
      },
    });
  }
}
