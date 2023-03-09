import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { User, Role } from '@prisma/client';
import { IncomingMessage } from 'http';

@Injectable()
export class AdminGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = this.getRequest<IncomingMessage & { user?: User }>(context);

    if (!request.user || request.user.role !== Role.ADMIN) {
      return false;
    }

    return true;
  }

  protected getRequest<T>(context: ExecutionContext): T {
    return context.switchToHttp().getRequest();
  }
}
