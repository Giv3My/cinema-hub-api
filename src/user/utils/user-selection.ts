import type { Prisma } from '@prisma/client';

export const userSelection: Prisma.UserSelect = {
  id: true,
  email: true,
  name: true,
  role: true,
  avatarPath: true,
  isHasPremium: true,
  favorites: true,
  createdAt: true,
};
