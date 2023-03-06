import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards, ValidationPipe } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ApiConflictResponse, ApiCreatedResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { CurrentUser } from '@/modules/auth/decorators/current-user.decorator';
import { User } from '@prisma/client';

@ApiTags('reviews')
@Controller('reviews')
@UseGuards(JwtAuthGuard)
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @ApiCreatedResponse({ description: 'Review created successfully' })
  @ApiConflictResponse()
  @ApiOperation({ operationId: 'create' })
  @Post()
  create(@Body(ValidationPipe) review: CreateReviewDto, @CurrentUser() user) {
    return this.reviewsService.create(review, user);
  }

  @ApiCreatedResponse({ description: 'Reviews found successfully' })
  @ApiConflictResponse()
  @ApiOperation({ operationId: 'findAll' })
  @Get()
  findAll(@CurrentUser() user: User, @Query() query) {
    return this.reviewsService.findAll(query, user);
  }

  @ApiCreatedResponse({ description: 'Review found successfully' })
  @ApiConflictResponse()
  @ApiOperation({ operationId: 'findById' })
  @ApiParam({ name: 'id', description: 'Review id' })
  @Get(':id')
  findById(@Param('id') id: string) {
    return this.reviewsService.findById(id);
  }

  @ApiCreatedResponse({ description: 'Review updated successfully' })
  @ApiConflictResponse()
  @ApiOperation({ operationId: 'update' })
  @ApiParam({ name: 'id', description: 'Review id' })
  @Patch(':id')
  update(
    @CurrentUser() currentUser: User,
    @Param('id') id: string,
    @Body(ValidationPipe) updateReviewDto: UpdateReviewDto,
  ) {
    return this.reviewsService.update(id, updateReviewDto, currentUser);
  }

  @ApiCreatedResponse({ description: 'Review deleted successfully' })
  @ApiConflictResponse()
  @ApiOperation({ operationId: 'remove' })
  @ApiParam({ name: 'id', description: 'Review id' })
  @Delete(':id')
  remove(@Param('id') id: string, @CurrentUser() currentUser: User) {
    return this.reviewsService.remove(id, currentUser);
  }
}
