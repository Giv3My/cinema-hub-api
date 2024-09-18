import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { Auth } from 'src/auth/decorators';
import { UpdateMovieDto } from './dto';

@Controller('movies')
export class MovieController {
  constructor(private movieService: MovieService) {}

  @Get()
  async getAll(@Query('searchTerm') searchTerm?: string) {
    return this.movieService.getAll(searchTerm);
  }

  @Get('slug/:slug')
  async getBySlug(@Param('slug') slug: string) {
    return this.movieService.getBySlug(slug);
  }

  @Get('popular')
  async getMostPopular() {
    return this.movieService.getMostPopular();
  }

  @Get('actor/:id')
  async getByActor(@Param('id') id: string) {
    return this.movieService.getByActor(id);
  }

  @Post('genres')
  @HttpCode(HttpStatus.OK)
  async getByMovies(@Body('genreIds') genreIds: string[]) {
    return this.movieService.getByGenres(genreIds);
  }

  @Patch('views')
  @HttpCode(HttpStatus.OK)
  async updateViewsCount(@Body('slug') slug: string) {
    return this.movieService.updateViewsCount(slug);
  }

  @Get('id/:id')
  @Auth('admin')
  async getById(@Param('id') id: string) {
    return this.movieService.getById(id);
  }

  @Post()
  @Auth('admin')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe())
  async create() {
    return this.movieService.create();
  }

  @Patch(':id')
  @Auth('admin')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe())
  async update(@Param('id') id: string, @Body() dto: UpdateMovieDto) {
    const updatedMovie = await this.movieService.update(id, dto);

    if (!updatedMovie) {
      throw new NotFoundException('Movie was not found!');
    }

    return updatedMovie;
  }

  @Delete(':id')
  @Auth('admin')
  async delete(@Param('id') id: string) {
    const deletedMovie = await this.movieService.delete(id);

    if (!deletedMovie) {
      throw new NotFoundException('Movie was not found!');
    }

    return deletedMovie;
  }
}
