import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateMovieDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  poster?: string;

  @IsOptional()
  @IsString()
  bigPoster?: string;

  @IsOptional()
  @IsString()
  videoUrl?: string;

  @IsOptional()
  @IsString()
  country?: string;

  @IsOptional()
  @IsNumber()
  year?: number;

  @IsOptional()
  @IsNumber()
  duration?: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  genres?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  actors?: string[];
}
