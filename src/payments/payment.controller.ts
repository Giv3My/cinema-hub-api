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
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { ConfigService } from '@nestjs/config';
import { Auth } from 'src/auth/decorators';
import { CurrentUser } from 'src/user/decorators';
import { PaymentDto, PaymentStatusDto } from './dto';
import { PaymentStatus } from '@prisma/client';
import type { Response } from 'express';

@Controller('payments')
export class PaymentController {
  constructor(
    private paymentService: PaymentService,
    private configService: ConfigService
  ) {}

  @Post()
  @Auth()
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe())
  async checkout(@Body() dto: PaymentDto, @CurrentUser('id') userId: string) {
    try {
      const paymentUrl = await this.paymentService.checkout(dto, userId);

      return paymentUrl;
    } catch (e) {
      throw e;
    }
  }

  @Post('status')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe())
  async updateStatus(@Body() dto: PaymentStatusDto, @Res() res: Response) {
    const updatedPayment = await this.paymentService.updateStatus(dto);

    const status = updatedPayment.status === PaymentStatus.PAYED ? 'success' : 'failure';
    const url = `${this.configService.get('APP_URL')}/payment?status=${status}`;

    return res.redirect(new URL(url).toString());
  }

  @Get()
  @Auth('admin')
  async getAll() {
    return this.paymentService.getAll();
  }

  @Delete(':id')
  @Auth('admin')
  async delete(@Param('id') id: string) {
    const deletedPayment = await this.paymentService.delete(id);

    if (!deletedPayment) {
      throw new NotFoundException('Payment was not found');
    }

    return deletedPayment;
  }
}
