import { CanActivate, ExecutionContext, Injectable, BadRequestException } from '@nestjs/common';
import { SessionStore } from '@store/session-store.interface';

@Injectable()
export class SessionGuard implements CanActivate {
  constructor(private readonly store: SessionStore) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    const sessionId = req.cookies?.sessionId;
    if (!sessionId) {
      throw new BadRequestException('No sessionId cookie');
    }

    const session = await this.store.getSession(sessionId);
    if (!session || !session.active) {
      throw new BadRequestException('Invalid or inactive session');
    }
    
    req.session = session;
    return true;
  }
}
