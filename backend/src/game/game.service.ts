import { BadRequestException, Injectable } from '@nestjs/common';
import { SpinResponse, SymbolLetter } from '@game/game.types';
import { SessionStore } from '@store/session-store.interface';
import { REWARDS, SYMBOLS } from './game.consts';

@Injectable()
export class GameService {
  constructor(private readonly store: SessionStore) {}

  private randomSymbol(): SymbolLetter {
    const idx = Math.floor(Math.random() * SYMBOLS.length);
    return SYMBOLS[idx];
  }

  private rollOnce(): { symbols: SymbolLetter[]; lineHit: boolean; reward: number; } {
    const a = this.randomSymbol();
    const b = this.randomSymbol();
    const c = this.randomSymbol();

    const lineHit = a === b && b === c;

    return { symbols: [a, b, c], lineHit, reward: REWARDS[a] ?? 0 };
  }

  private shouldReroll(nextCreditsIfWin: number): boolean {
    if (nextCreditsIfWin < 40) {
      return false;
    }
    if (nextCreditsIfWin <= 60) {
      return Math.random() < 0.3;
    }
    return Math.random() < 0.6;
  }

  async spin(sessionId: string): Promise<SpinResponse> {
    const session = await this.store.getSession(sessionId);

    if (!session) {
      throw new BadRequestException('No session, check guard');
    }

    if (session.credits <= 0) {
      throw new BadRequestException('Insufficient credits');
    }

    let result = this.rollOnce();

    if (result.lineHit) {
      const prospective = session.credits + result.reward;
      if (this.shouldReroll(prospective)) {
        // one-time reroll
        result = this.rollOnce();
      }
    }

    let newCredits: number;
    if (result.lineHit) {
      newCredits = session.credits + result.reward;
    } else {
      newCredits = session.credits - 1;
    }

    await this.store.updateCredits(session.id, newCredits);

    return {
      symbols: result.symbols,
      lineHit: result.lineHit,
      reward: result.reward,
      credits: newCredits,
    };
  }

  async cashOut(sessionId: string): Promise<{ payout: number }> {
    const session = await this.store.getSession(sessionId);
    if (!session) {
      throw new BadRequestException('No session, check guard');
    }

    if (session.credits <= 0) {
      throw new BadRequestException('No credits to cash out');
    }
    await this.store.closeSession(session.id);
    return { payout: session.credits };
  }
}



