import ms from 'ms';
import type { CookieOptions } from 'express';

export const accessTokenOptions: CookieOptions = {
  httpOnly: true,
  sameSite: 'lax',
  secure: true,
};

export const refreshTokenOptions: CookieOptions = {
  ...accessTokenOptions,
  maxAge: ms('7d'),
};
