import type { CashoutResponse, SpinResponse } from '../types';
import { ApiService } from './api';

class GameApiService {
  private api: ApiService;
  private scope = 'game';

  constructor() {
    this.api = new ApiService();
  }

  spin() {
    return this.api.post<SpinResponse>(`/${this.scope}/spin`);
  }

  cashOut() {
    return this.api.post<CashoutResponse>(`/${this.scope}/cashout`);
  }
}

export const gameApiService = new GameApiService();
