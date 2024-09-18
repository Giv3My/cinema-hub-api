import { Injectable, NotFoundException } from '@nestjs/common';
import { FileService } from 'src/file/file.service';
import { PrismaService } from 'prisma/prisma.service';
import { movieSelection } from './utils';
import { generateSlug } from 'src/utils';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Injectable()
export class MovieService {
  constructor(
    private fileService: FileService,
    private prismaService: PrismaService
  ) {}

  async getAll(searchTerm?: string) {
    if (searchTerm) {
      return this.search(searchTerm);
    }

    return this.prismaService.movie.findMany({
      select: movieSelection,
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  private async search(searchTerm: string) {
    return this.prismaService.movie.findMany({
      where: { title: { contains: searchTerm, mode: 'insensitive' } },
      select: movieSelection,
    });
  }

  async getBySlug(slug: string) {
    const movie = await this.prismaService.movie.findFirst({
      where: {
        slug,
      },
      select: movieSelection,
    });

    if (!movie) {
      throw new NotFoundException('Movie was not found!');
    }

    return movie;
  }

  async getMostPopular() {
    return this.prismaService.movie.findMany({
      include: {
        actors: true,
        genres: true,
      },
      orderBy: {
        views: 'desc',
      },
      take: 8,
    });
  }

  async getByActor(actorId: string) {
    return this.prismaService.movie.findMany({
      where: {
        actors: {
          some: {
            id: actorId,
          },
        },
      },
    });
  }

  async getByGenres(genreIds: string[]) {
    return this.prismaService.movie.findMany({
      where: {
        genres: {
          some: {
            id: {
              in: genreIds,
            },
          },
        },
      },
    });
  }

  async updateViewsCount(slug: string) {
    return this.prismaService.movie.update({
      where: { slug },
      data: {
        views: { increment: 1 },
      },
    });
  }

  async getById(id: string) {
    const movie = await this.prismaService.movie.findUnique({
      where: {
        id,
      },
      select: movieSelection,
    });

    if (!movie) {
      throw new NotFoundException('Movie was not found!');
    }

    return movie;
  }

  async create() {
    const movie = await this.prismaService.movie.create({ data: {} });

    return movie.id;
  }

  async update(id: string, dto: UpdateMovieDto) {
    return this.prismaService.movie.update({
      where: { id },
      data: {
        ...dto,
        slug: dto.title && generateSlug(dto.title),
        genres: {
          set: dto.genres && dto.genres.map((genreId) => ({ id: genreId })),
          disconnect: dto.genres
            .filter((genreId) => !dto.genres.includes(genreId))
            .map((genreId) => ({ id: genreId })),
        },
        actors: {
          set: dto.actors && dto.actors.map((actorId) => ({ id: actorId })),
          disconnect: dto.actors
            .filter((actorId) => !dto.actors.includes(actorId))
            .map((actorId) => ({ id: actorId })),
        },
      },
    });
  }

  async delete(id: string) {
    const deletedMovie = await this.prismaService.movie.delete({
      where: { id },
    });

    await this.fileService.deleteFile([
      deletedMovie.poster,
      deletedMovie.bigPoster,
      deletedMovie.videoUrl,
    ]);

    return deletedMovie;
  }
}
