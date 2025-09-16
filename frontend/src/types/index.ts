export type SymbolLetter = 'C' | 'L' | 'O' | 'W';

export interface SpinResponse {
  symbols: SymbolLetter[];
  lineHit: boolean;
  reward: number;
  credits: number;
}

export interface SessionResponse {
  user: string;
  credits: number;
  active: boolean;
}

export interface StartSessionResponse {
  credits: number;
}

export interface CashoutResponse {
  payout: number;
}

