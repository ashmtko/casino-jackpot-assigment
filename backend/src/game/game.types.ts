export type SymbolLetter = 'C' | 'L' | 'O' | 'W';

export interface SpinResponse {
  symbols: SymbolLetter[];
  lineHit: boolean;
  reward: number;
  credits: number;
}