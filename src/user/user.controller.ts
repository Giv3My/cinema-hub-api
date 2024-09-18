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
import { UserService } from './user.service';
import { Auth } from 'src/auth/decorators';
import { CurrentUser } from './decorators';
import { UpdateUserDto } from './dto';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('profile')
  @Auth()
  async getProfile(@CurrentUser('id') id: string) {
    return this.userService.getById(id);
  }

  @Post('profile/favorites')
  @Auth()
  @HttpCode(HttpStatus.OK)
  async toggleFavorite(
    @Body('movieId') movieId: string,
    @CurrentUser('id') userId: string
  ) {
    return this.userService.toggleFavorite(movieId, userId);
  }

  @Get()
  @Auth('admin')
  async getAll(@Query('searchTerm') searchTerm?: string) {
    return this.userService.getAll(searchTerm);
  }

  @Get('id/:id')
  @Auth('admin')
  async getById(@Param('id') id: string) {
    return this.userService.getById(id);
  }

  @Patch(':id')
  @Auth('admin')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe())
  async update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    const updatedUser = await this.userService.update(id, dto);

    if (!updatedUser) {
      throw new NotFoundException('User was not found!');
    }

    return updatedUser;
  }

  @Delete(':id')
  @Auth('admin')
  async delete(@Param('id') id: string) {
    const deletedUser = await this.userService.delete(id);

    if (!deletedUser) {
      throw new NotFoundException('User was not found!');
    }

    return deletedUser;
  }
}
