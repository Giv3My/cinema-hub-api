import { Module } from '@nestjs/common';
import { ActorController } from './actor.controller';
import { ActorService } from './actor.service';
import { FileService } from 'src/file/file.service';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  controllers: [ActorController],
  providers: [ActorService, FileService, PrismaService],
})
export class ActorModule {}
