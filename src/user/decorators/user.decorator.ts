import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import type { User } from '@prisma/client';

export const CurrentUser = createParamDecorator(
  (key: keyof User, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<{ user: User }>();
    const user = request.user;

    return key ? user[key] : user;
  }
);
