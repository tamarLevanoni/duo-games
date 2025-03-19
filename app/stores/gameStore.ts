import { Game } from '@prisma/client';
import { create } from 'zustand';

export interface GameStore {
  games: Game[];
  addGame: (game: Game) => void;
  removeGame: (id: string) => void;
}

const useGameStore = create<GameStore>((set) => ({
  games: [],
  addGame: (game) => set((state) => ({ games: [...state.games, game] })),
  removeGame: (id) => set((state) => ({ games: state.games.filter(g => g.id !== id) })),
}));

export default useGameStore;