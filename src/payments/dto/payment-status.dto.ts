import { IsString } from 'class-validator';

export class PaymentStatusDto {
  @IsString()
  data: string;

  @IsString()
  signature: string;
}
