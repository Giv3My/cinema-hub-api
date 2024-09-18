import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { getPaymentUrl } from './liqpay';
import { getDecodedBase64Data } from './liqpay/utils';
import { paymentSelection } from './utils';
import { PaymentDto, PaymentStatusDto } from './dto';
import { PaymentStatus } from '@prisma/client';
import { isPaymentSuccess } from './types/guards';
import type { PaymentData } from './types';

@Injectable()
export class PaymentService {
  constructor(
    private userService: UserService,
    private prismaService: PrismaService
  ) {}

  async checkout(dto: PaymentDto, userId: string) {
    const user = await this.userService.getById(userId);

    if (!user) {
      throw new NotFoundException('User was not found');
    }

    if (user.isHasPremium) {
      throw new ConflictException('This user already has premium');
    }

    const payment = await this.prismaService.payment.create({
      data: {
        amount: dto.amount,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });

    const paymentUrl = await getPaymentUrl(payment.id, dto.amount);

    if (!paymentUrl) {
      throw new BadRequestException('An error occurred when making a payment');
    }

    return paymentUrl;
  }

  async updateStatus(dto: PaymentStatusDto) {
    const data = getDecodedBase64Data<PaymentData>(dto.data);

    const updatedPayment = await this.prismaService.payment.update({
      where: {
        id: data.order_id,
      },
      data: {
        status: isPaymentSuccess(data) ? PaymentStatus.PAYED : PaymentStatus.CANCELLED,
      },
    });

    if (updatedPayment.status === PaymentStatus.PAYED) {
      await this.prismaService.user.update({
        where: {
          id: updatedPayment.userId,
        },
        data: {
          isHasPremium: true,
        },
      });
    }

    return updatedPayment;
  }

  async getAll() {
    return this.prismaService.payment.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      select: paymentSelection,
    });
  }

  async delete(id: string) {
    return this.prismaService.payment.delete({
      where: {
        id,
      },
    });
  }
}
