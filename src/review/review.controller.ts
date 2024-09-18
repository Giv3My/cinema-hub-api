import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { Auth } from 'src/auth/decorators';
import { CreateReviewDto } from './dto';
import { CurrentUser } from 'src/user/decorators';

@Controller('reviews')
export class ReviewController {
  constructor(private reviewService: ReviewService) {}

  @Post('create/:movieId')
  @Auth('admin')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe())
  async create(
    @CurrentUser('id') userId: string,
    @Param('movieId') movieId: string,
    @Body() dto: CreateReviewDto
  ) {
    return this.reviewService.create(userId, movieId, dto);
  }

  @Get()
  @Auth('admin')
  async getAll() {
    return this.reviewService.getAll();
  }

  @Delete(':id')
  @Auth('admin')
  async delete(@Param('id') id: string) {
    const deletedReview = await this.reviewService.delete(id);

    if (!deletedReview) {
      throw new NotFoundException('Review was not found!');
    }

    return deletedReview;
  }
}
