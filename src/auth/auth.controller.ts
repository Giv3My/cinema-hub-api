import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { accessTokenOptions, refreshTokenOptions } from './constants';
import type { Response, Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe())
  async register(@Res({ passthrough: true }) res: Response, @Body() dto: AuthDto) {
    try {
      const { user, ...tokens } = await this.authService.register(dto);

      res.cookie('accessToken', tokens.accessToken, accessTokenOptions);
      res.cookie('refreshToken', tokens.refreshToken, refreshTokenOptions);

      return { user, accessToken: tokens.accessToken };
    } catch (e) {
      throw e;
    }
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe())
  async login(@Res({ passthrough: true }) res: Response, @Body() dto: AuthDto) {
    try {
      const { user, ...tokens } = await this.authService.login(dto);

      res.cookie('accessToken', tokens.accessToken, accessTokenOptions);
      res.cookie('refreshToken', tokens.refreshToken, refreshTokenOptions);

      return { user, accessToken: tokens.accessToken };
    } catch (e) {
      throw e;
    }
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe())
  async logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('accessToken', accessTokenOptions);
    res.clearCookie('refreshToken', refreshTokenOptions);
    return;
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe())
  async refresh(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    try {
      const refreshToken = req.cookies['refreshToken'];
      const tokens = await this.authService.validateRefreshToken(refreshToken);

      res.cookie('accessToken', tokens.accessToken, accessTokenOptions);
      res.cookie('refreshToken', tokens.refreshToken, refreshTokenOptions);

      return tokens.accessToken;
    } catch (e) {
      res.clearCookie('accessToken', accessTokenOptions);
      res.clearCookie('refreshToken', refreshTokenOptions);

      throw e;
    }
  }
}
