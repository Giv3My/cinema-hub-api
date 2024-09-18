import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { reviewSelection } from './utils/review-selection';
import { CreateReviewDto } from './dto';

@Injectable()
export class ReviewService {
  constructor(private prismaService: PrismaService) {}

  async create(userId: string, movieId: string, dto: CreateReviewDto) {
    return this.prismaService.review.create({
      data: {
        ...dto,
        user: { connect: { id: userId } },
        movie: { connect: { id: movieId } },
      },
    });
  }

  async getAll() {
    return this.prismaService.review.findMany({
      select: reviewSelection,
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async delete(id: string) {
    return this.prismaService.review.delete({
      where: { id },
    });
  }
}
