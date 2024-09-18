import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { verify } from 'argon2';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async register(dto: AuthDto) {
    const exists = await this.userService.getByEmail(dto.email);

    if (exists) {
      throw new BadRequestException('User is already exists!');
    }

    const newUser = await this.userService.create(dto);
    const { password, ...user } = newUser;

    const tokens = this.generateTokens(user.id);
    return { user, ...tokens };
  }

  async login(dto: AuthDto) {
    const user = await this.validateUser(dto);

    const tokens = this.generateTokens(user.id);
    return { user, ...tokens };
  }

  private async validateUser(dto: AuthDto) {
    const user = await this.userService.getByEmail(dto.email);

    if (!user) {
      throw new NotFoundException('User was not found!');
    }

    const isValidPassword = await verify(user.password, dto.password);

    if (!isValidPassword) {
      throw new UnauthorizedException('Password is not valid!');
    }

    const { password, ...userDto } = user;
    return userDto;
  }

  async validateRefreshToken(refreshToken: string) {
    try {
      const payload = await this.jwtService.verify(refreshToken);

      if (!payload) {
        throw new Error('Invalid refresh token!');
      }

      const tokens = this.generateTokens(payload.id);
      return tokens;
    } catch {
      throw new UnauthorizedException('Refresh token has been expired!');
    }
  }

  private generateTokens(userId: string) {
    const data = { id: userId };

    const accessToken = this.jwtService.sign(data, {
      expiresIn: '1h',
    });

    const refreshToken = this.jwtService.sign(data, {
      expiresIn: '7d',
    });

    return { accessToken, refreshToken };
  }
}
