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
import { GenreService } from './genre.service';
import { Auth } from 'src/auth/decorators';
import { UpdateGenreDto } from './dto';

@Controller('genres')
export class GenreController {
  constructor(private genreService: GenreService) {}

  @Get()
  async getAll(@Query('searchTerm') searchTerm?: string) {
    return this.genreService.getAll(searchTerm);
  }

  @Get('slug/:slug')
  async getBySlug(@Param('slug') slug: string) {
    return this.genreService.getBySlug(slug);
  }

  @Get('id/:id')
  @Auth('admin')
  async getById(@Param('id') id: string) {
    return this.genreService.getById(id);
  }

  @Post()
  @Auth('admin')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe())
  async create() {
    return this.genreService.create();
  }

  @Patch(':id')
  @Auth('admin')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe())
  async update(@Param('id') id: string, @Body() dto: UpdateGenreDto) {
    const updatedGenre = await this.genreService.update(id, dto);

    if (!updatedGenre) {
      throw new NotFoundException('Genre was not found!');
    }

    return updatedGenre;
  }

  @Delete(':id')
  @Auth('admin')
  async delete(@Param('id') id: string) {
    const deletedGenre = await this.genreService.delete(id);

    if (!deletedGenre) {
      throw new NotFoundException('Genre was not found!');
    }

    return deletedGenre;
  }
}
