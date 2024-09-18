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
import { ActorService } from './actor.service';
import { Auth } from 'src/auth/decorators';
import { UpdateActorDto } from './dto';

@Controller('actors')
export class ActorController {
  constructor(private actorService: ActorService) {}

  @Get()
  async getAll(@Query('searchTerm') searchTerm?: string) {
    return this.actorService.getAll(searchTerm);
  }

  @Get('slug/:slug')
  async getBySlug(@Param('slug') slug: string) {
    return this.actorService.getBySlug(slug);
  }

  @Get('id/:id')
  @Auth('admin')
  async getById(@Param('id') id: string) {
    return this.actorService.getById(id);
  }
  @Post()
  @Auth('admin')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe())
  async create() {
    return this.actorService.create();
  }

  @Patch(':id')
  @Auth('admin')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe())
  async update(@Param('id') id: string, @Body() dto: UpdateActorDto) {
    const updatedActor = await this.actorService.update(id, dto);

    if (!updatedActor) {
      throw new NotFoundException('Actor was not found!');
    }

    return updatedActor;
  }

  @Delete(':id')
  @Auth('admin')
  async delete(@Param('id') id: string) {
    const deletedActor = await this.actorService.delete(id);

    if (!deletedActor) {
      throw new NotFoundException('Actor was not found!');
    }

    return deletedActor;
  }
}
