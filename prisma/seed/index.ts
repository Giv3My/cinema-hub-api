import { PrismaService } from '../prisma.service';
import { genres, actors, movies } from './data';
import type { Prisma } from '@prisma/client';

const prismaService = new PrismaService();

const up = async () => {
  await prismaService.genre.createMany({
    data: genres,
  });

  await Promise.all(
    (actors as Prisma.ActorCreateInput[]).map(async (actor) => {
      await prismaService.actor.create({ data: actor });
    })
  );

  await Promise.all(
    (movies as Prisma.MovieCreateInput[]).map(async (movie) => {
      await prismaService.movie.create({ data: movie });
    })
  );
};

const down = async () => {
  await prismaService.$executeRaw`TRUNCATE TABLE "genre" RESTART IDENTITY CASCADE`;
  await prismaService.$executeRaw`TRUNCATE TABLE "actor" RESTART IDENTITY CASCADE`;
  await prismaService.$executeRaw`TRUNCATE TABLE "movie" RESTART IDENTITY CASCADE`;
};

const main = async () => {
  try {
    await down();
    await up();
  } catch (e) {
    console.log(e);
  }
};

main()
  .then(async () => {
    await prismaService.$disconnect();
  })
  .catch(async (e) => {
    console.log(e);
    await prismaService.$disconnect();
    process.exit(1);
  });
