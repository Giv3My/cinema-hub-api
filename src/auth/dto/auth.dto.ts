import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class AuthDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6, {
    message: 'password must contain at least 6 characters',
  })
  password: string;
}
