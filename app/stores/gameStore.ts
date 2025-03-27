import { Game } from "@prisma/client";
import { create } from "zustand";
import { gamesInfo } from "./types";
import { persist, createJSONStorage } from "zustand/middleware";

export interface GameStore {
  games: gamesInfo[];
  fetchGames: () => void;
  addGame: (game: Game) => void;
  removeGame: (id: string) => void;
}

const useGameStore = create<GameStore>()(
  (set, get) => ({
    games: [],
    fetchGames: async () => {
      try {
        console.log("fetching games" + get().games.length);
        // if(get().games.length) return;
        const response = await fetch("/api/games");
        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || "Failed to fetch games");
        }
        const games = await response.json();
        console.log(games);
        set({ games });
      } catch (error) {}
    },
    addGame: (game) => {},
    removeGame: (id) => {},
  })
  // {
  //   name: 'game-store',
  //   storage:createJSONStorage(()=>sessionStorage), // שמירה רק בזמן הסשן

  // }
);

export default useGameStore;
