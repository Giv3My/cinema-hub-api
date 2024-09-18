import type { Prisma } from '@prisma/client';

export const genreSelection: Prisma.GenreSelect = {
  id: true,
  name: true,
  slug: true,
  description: true,
  icon: true,
  createdAt: true,
};
