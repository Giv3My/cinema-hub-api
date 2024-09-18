import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { genreSelection } from './utils';
import { generateSlug } from 'src/utils';
import { UpdateGenreDto } from './dto';

@Injectable()
export class GenreService {
  constructor(private prismaService: PrismaService) {}

  async getAll(searchTerm?: string) {
    if (searchTerm) {
      return this.search(searchTerm);
    }

    return this.prismaService.genre.findMany({
      select: genreSelection,
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  private async search(searchTerm: string) {
    return this.prismaService.genre.findMany({
      where: {
        OR: [
          { name: { contains: searchTerm, mode: 'insensitive' } },
          { description: { contains: searchTerm, mode: 'insensitive' } },
        ],
      },
      select: genreSelection,
    });
  }

  async getBySlug(slug: string) {
    const genre = await this.prismaService.genre.findFirst({
      where: {
        slug,
      },
      select: genreSelection,
    });

    if (!genre) {
      throw new NotFoundException('Genre was not found!');
    }

    return genre;
  }

  async getById(id: string) {
    const genre = await this.prismaService.genre.findUnique({
      where: {
        id,
      },
      select: genreSelection,
    });

    if (!genre) {
      throw new NotFoundException('Genre was not found!');
    }

    return genre;
  }

  async create() {
    const genre = await this.prismaService.genre.create({ data: {} });

    return genre.id;
  }

  async update(id: string, dto: UpdateGenreDto) {
    return this.prismaService.genre.update({
      where: { id },
      data: {
        ...dto,
        slug: dto.name && generateSlug(dto.name),
      },
    });
  }

  async delete(id: string) {
    return this.prismaService.genre.delete({
      where: { id },
    });
  }
}
