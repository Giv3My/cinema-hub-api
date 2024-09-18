import { applyDecorators, UseGuards } from '@nestjs/common';
import { AdminGuard, JwtAuthGuard } from '../guards';
import type { Role } from '../types';

export const Auth = (role: Role = 'user') => {
  return applyDecorators(
    role === 'admin' ? UseGuards(JwtAuthGuard, AdminGuard) : UseGuards(JwtAuthGuard)
  );
};
