import ms from 'ms';
import type { CookieOptions } from 'express';

export const accessTokenOptions: CookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: 'lax',
  maxAge: ms('7d'),
};

export const refreshTokenOptions: CookieOptions = {
  ...accessTokenOptions,
  // maxAge: ms('7d'),
};
