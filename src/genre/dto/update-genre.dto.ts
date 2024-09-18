import { IsOptional, IsString } from 'class-validator';

export class UpdateGenreDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  icon?: string;
}
