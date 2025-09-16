import { create } from 'zustand';

interface State {
  reels: string[];
  pending: boolean;
  message?: string;
  credits: number;
  user: string
}

interface GameStore {
  state: State
  setReels: (symbols: string[]) => void;
  setPending: (busy: boolean) => void;
  setMessage: (msg: string) => void;
  clearMessage: () => void;
  setCredits: (credits: number) => void;
  resetState: () => void;
  setUser: (user: string) => void;
}

const DEFAULT_STATE: State = {
  reels: ['-', '-', '-'],
  pending: false,
  message: undefined,
  credits: 0,
  user: ''
}


export const useGameStore = create<GameStore>((set, _get) => ({
  state: DEFAULT_STATE,
  setReels: (symbols: string[]) => set((s) => ({
    state: { ...s.state, reels: symbols, pending: false }
  })),
  setCredits: (credits: number) => set((s) => ({ state: {...s.state, credits } })),
  setUser: (user: string) => set((s) => ({ state: {...s.state, user } })),
  setPending: (pending: boolean) => set((s) => ({ state: {...s.state, pending } })),
  setMessage: (message: string) => set((s) => ({ state: {...s.state, message } })),
  clearMessage: () => set((s) => ({ state: {...s.state, message: undefined } })),
  resetState: () => set({ 
    state: DEFAULT_STATE
  }),
}));


