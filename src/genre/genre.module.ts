import { Module } from '@nestjs/common';
import { GenreService } from './genre.service';
import { PrismaService } from 'prisma/prisma.service';
import { GenreController } from './genre.controller';

@Module({
  controllers: [GenreController],
  providers: [GenreService, PrismaService],
})
export class GenreModule {}
