import { userSelection } from 'src/user/utils';
import type { Prisma } from '@prisma/client';

export const reviewSelection: Prisma.ReviewSelect = {
  id: true,
  rating: true,
  text: true,
  user: {
    select: userSelection,
  },
  createdAt: true,
};
