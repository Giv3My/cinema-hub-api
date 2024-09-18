import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import dayjs from 'dayjs';
import { formatDate } from './utils';
import { PaymentStatus } from '@prisma/client';

dayjs.locale('ru');

@Injectable()
export class StatisticsService {
  constructor(private prismaService: PrismaService) {}

  async getMainStatistics() {
    const countUsers = await this.prismaService.user.count();
    const countMovies = await this.prismaService.movie.count();
    const countViews = await this.prismaService.movie.aggregate({
      _sum: {
        views: true,
      },
    });
    const averageRating = await this.prismaService.review.aggregate({
      _avg: {
        rating: true,
      },
    });

    return [
      { id: 1, name: 'Просмотры', value: countViews._sum.views },
      { id: 2, name: 'Фильмы', value: countMovies },
      { id: 3, name: 'Пользователи', value: countUsers },
      { id: 4, name: 'Средний рейтинг', value: averageRating._avg.rating || 0 },
    ];
  }

  async getMiddleStatistics() {
    const topMovies = await this.prismaService.movie.findMany({
      select: {
        title: true,
        views: true,
      },
      orderBy: {
        views: 'desc',
      },
      take: 4,
    });

    const startDate = dayjs().subtract(14, 'days').startOf('day').toDate();
    const endDate = dayjs().endOf('day').toDate();

    const salesRaw = await this.prismaService.payment.groupBy({
      where: {
        status: PaymentStatus.PAYED,
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
      by: ['createdAt'],
      _sum: {
        amount: true,
      },
    });

    const salesByDate: Record<string, number> = {};

    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
      const formattedDate = formatDate(new Date(d));
      salesByDate[formattedDate] = 0;
    }

    salesRaw.forEach((sale) => {
      const formattedDate = formatDate(new Date(sale.createdAt));

      if (salesByDate[formattedDate] !== undefined) {
        salesByDate[formattedDate] += sale._sum.amount;
      }
    });

    const salesByWeek = Object.keys(salesByDate).map((date) => ({
      date,
      total: salesByDate[date],
    }));

    return {
      topMovies,
      salesByWeek,
    };
  }
}
