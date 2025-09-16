import { Injectable } from '@nestjs/common';
import { SessionStore } from '@store/session-store.interface';

@Injectable()
export class SessionService {
  constructor(private readonly store: SessionStore) { }

  async startSession(): Promise<{ sessionId: string; credits: number }> {
    const session = await this.store.createSession();
    return { sessionId: session.id, credits: session.credits };
  }

  async getSession(sessionId: string) {
    if (!sessionId) {
      return null;
    } 
    return this.store.getSession(sessionId);
  }
}
