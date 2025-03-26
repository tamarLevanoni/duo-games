import { Game } from '@prisma/client';
import { create } from 'zustand';
import { gamesInfo } from './types';

export interface GameStore {
  games: gamesInfo[];
  fetchGames: () => void;
  addGame: (game: Game) => void;
  removeGame: (id: string) => void;
}

const useGameStore = create<GameStore>((set) => ({
  games: [],
  fetchGames:async () => {
    try {
      const response = await fetch('/api/games');
      if(!response.ok){
        const error = await response.json();
        throw new Error(error.message||'Failed to fetch games');
      }
      const games = await response.json();
      console.log(games);
      set({ games });
      
    } catch (error) {
      
    }
  },
  addGame: (game) =>{

  },
  removeGame: (id) => {

  },
}));

export default useGameStore;