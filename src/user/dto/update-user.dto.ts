import { IsEmail, IsEnum, IsOptional, IsString, MinLength } from 'class-validator';
import { UserRole } from '@prisma/client';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  @MinLength(6, {
    message: 'password must contain at least 6 characters',
  })
  password?: string;

  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;
}
