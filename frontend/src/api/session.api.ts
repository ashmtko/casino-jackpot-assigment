import type { SessionResponse, StartSessionResponse } from '../types';
import { ApiService } from './api';

class SessionApiService {
  private api: ApiService;
  private scope = 'session';

  constructor() {
    this.api = new ApiService();
  }

  startSession() {
    return this.api.post<StartSessionResponse>(`/${this.scope}/start`);
  }

  getSession() {
    return this.api.get<SessionResponse>(`/${this.scope}`);
  }
}

export const sessionApiService = new SessionApiService();
