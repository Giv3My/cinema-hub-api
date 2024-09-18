import type { Prisma } from '@prisma/client';

export const actorSelection: Prisma.ActorSelect = {
  id: true,
  name: true,
  slug: true,
  photoUrl: true,
  movies: {
    select: {
      id: true,
    },
  },
  createdAt: true,
};
