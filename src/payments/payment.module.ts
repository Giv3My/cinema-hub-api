import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { UserService } from 'src/user/user.service';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  controllers: [PaymentController],
  providers: [PaymentService, UserService, ConfigService, PrismaService],
})
export class PaymentsModule {}
