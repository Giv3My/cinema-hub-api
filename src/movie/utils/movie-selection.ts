import { actorSelection } from 'src/actor/utils';
import { genreSelection } from 'src/genre/utils';
import { reviewSelection } from 'src/review/utils/review-selection';
import type { Prisma } from '@prisma/client';

export const movieSelection: Prisma.MovieSelect = {
  id: true,
  title: true,
  slug: true,
  poster: true,
  bigPoster: true,
  videoUrl: true,
  views: true,
  country: true,
  year: true,
  duration: true,
  reviews: {
    select: reviewSelection,
    orderBy: { createdAt: 'desc' },
  },
  actors: {
    select: actorSelection,
  },
  genres: {
    select: genreSelection,
  },
  createdAt: true,
};
