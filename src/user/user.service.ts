import { Injectable } from '@nestjs/common';
import { hash } from 'argon2';
import { PrismaService } from 'prisma/prisma.service';
import { userSelection } from './utils';
import { AuthDto } from 'src/auth/dto';
import { UpdateUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async create(dto: AuthDto) {
    const user = {
      name: dto.name,
      email: dto.email,
      password: await hash(dto.password),
    };

    return this.prismaService.user.create({
      data: user,
    });
  }

  async getById(id: string) {
    return this.prismaService.user.findUnique({
      where: { id },
      select: userSelection,
    });
  }
  async getByEmail(email: string) {
    return this.prismaService.user.findUnique({
      where: { email },
      include: {
        favorites: true,
      },
    });
  }

  async toggleFavorite(movieId: string, userId: string) {
    const user = await this.getById(userId);

    const exists = user.favorites.some((movie) => movie.id === movieId);

    await this.prismaService.user.update({
      where: { id: userId },
      data: {
        favorites: {
          set: exists
            ? user.favorites.filter((movie) => movie.id !== movieId)
            : [...user.favorites, { id: movieId }],
        },
      },
    });
  }

  async getAll(searchTerm?: string) {
    if (searchTerm) {
      return this.search(searchTerm);
    }

    return this.prismaService.user.findMany({
      select: userSelection,
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  private async search(searchTerm: string) {
    return this.prismaService.user.findMany({
      where: { email: { contains: searchTerm, mode: 'insensitive' } },
      select: userSelection,
    });
  }

  async update(id: string, dto: UpdateUserDto) {
    return this.prismaService.user.update({
      where: { id },
      data: {
        ...dto,
        password: dto.password && (await hash(dto.password)),
      },
    });
  }

  async delete(id: string) {
    return this.prismaService.user.delete({
      where: { id },
    });
  }
}
