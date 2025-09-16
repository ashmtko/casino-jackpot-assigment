import Redis from 'ioredis';
import { randomUUID } from 'node:crypto';
import { Session, SessionStore } from '@store/session-store.interface';

export class RedisSessionStore implements SessionStore {
  private client: Redis;
  private prefix = 'session:';

  constructor(url: string) {
    this.client = new Redis(url);
  }

  async connect() {
    await this.client.ping();
  }

  private key(id: string) {
    return `${this.prefix}${id}`;
  }

  async createSession(): Promise<Session> {
    const id = randomUUID();
    const now = Date.now();

    const username = `user_${Math.floor(Math.random() * 1000)}`

    const session: Session = { id, credits: 10, active: true, user: username, createdAt: now, updatedAt: now };
    await this.client.set(this.key(id), JSON.stringify(session));
    return session;
  }

  async getSession(id: string): Promise<Session | null> {
    const data = await this.client.get(this.key(id));
    if (!data) return null;

    const parsed = JSON.parse(data) as Session;
    return parsed;
  }

  async updateCredits(id: string, credits: number): Promise<void> {
    const s = await this.getSession(id);
    if (!s) return;
    s.credits = credits;
    s.updatedAt = Date.now();
    await this.client.set(this.key(id), JSON.stringify(s));
  }

  async closeSession(id: string): Promise<void> {
    await this.client.del(this.key(id));
  }
}


