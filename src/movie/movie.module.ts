import { Module } from '@nestjs/common';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';
import { FileService } from 'src/file/file.service';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  controllers: [MovieController],
  providers: [MovieService, FileService, PrismaService],
})
export class MovieModule {}
