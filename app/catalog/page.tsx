"use client";
import React, { useEffect, useState } from "react";
import { gamesInfo } from "../stores/types";
import { useGameStore } from "../stores/stores";

const CatalogPage = () => {
  const games = useGameStore((state) => state.games);
  useEffect(() => {
  }, []);

  return (
    <div>
      <h1>Catalog Page</h1>
      <div className="game-cards">
        {games.map((game: gamesInfo) => (
          <div key={game.id} className="game-card">
            <h2>{game.name}</h2>
            <p>{game.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CatalogPage;
