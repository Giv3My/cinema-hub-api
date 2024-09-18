import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { type User, UserRole } from '@prisma/client';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<{ user: User }>();
    const user = request.user;

    if (user.role !== UserRole.ADMIN) {
      throw new ForbiddenException(
        'You have insufficient permissions to perform this operation!'
      );
    }

    return true;
  }
}
