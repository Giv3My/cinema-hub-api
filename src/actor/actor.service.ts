import { Injectable, NotFoundException } from '@nestjs/common';
import { FileService } from 'src/file/file.service';
import { PrismaService } from 'prisma/prisma.service';
import { actorSelection } from './utils';
import { generateSlug } from 'src/utils';
import { UpdateActorDto } from './dto';

@Injectable()
export class ActorService {
  constructor(
    private fileService: FileService,
    private prismaService: PrismaService
  ) {}

  async getAll(searchTerm?: string) {
    if (searchTerm) {
      return this.search(searchTerm);
    }

    return this.prismaService.actor.findMany({
      select: actorSelection,
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  private async search(searchTerm: string) {
    return this.prismaService.actor.findMany({
      where: { name: { contains: searchTerm, mode: 'insensitive' } },
      select: actorSelection,
    });
  }

  async getBySlug(slug: string) {
    const actor = await this.prismaService.actor.findFirst({
      where: {
        slug,
      },
      select: actorSelection,
    });

    if (!actor) {
      throw new NotFoundException('Actor was not found!');
    }

    return actor;
  }

  async getById(id: string) {
    const actor = await this.prismaService.actor.findUnique({
      where: {
        id,
      },
      select: actorSelection,
    });

    if (!actor) {
      throw new NotFoundException('actor was not found!');
    }

    return actor;
  }

  async create() {
    const actor = await this.prismaService.actor.create({ data: {} });

    return actor.id;
  }

  async update(id: string, dto: UpdateActorDto) {
    return this.prismaService.actor.update({
      where: { id },
      data: {
        ...dto,
        slug: dto.name && generateSlug(dto.name),
      },
    });
  }

  async delete(id: string) {
    const deletedActor = await this.prismaService.actor.delete({
      where: { id },
    });

    await this.fileService.deleteFile([deletedActor.photoUrl]);

    return deletedActor;
  }
}
