export interface Session {
  id: string;
  credits: number;
  active: boolean;
  user: string
  createdAt: number;
  updatedAt: number;
}

export abstract class SessionStore {
  abstract createSession(): Promise<Session>;
  abstract getSession(id: string): Promise<Session | null>;
  abstract updateCredits(id: string, credits: number): Promise<void>;
  abstract closeSession(id: string): Promise<void>;
}



