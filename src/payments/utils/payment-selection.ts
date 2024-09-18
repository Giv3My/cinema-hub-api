import { userSelection } from 'src/user/utils';
import type { Prisma } from '@prisma/client';

export const paymentSelection: Prisma.PaymentSelect = {
  id: true,
  createdAt: true,
  status: true,
  amount: true,
  user: {
    select: userSelection,
  },
};
