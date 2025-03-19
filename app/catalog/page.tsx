"use client";
import React, { useEffect, useState } from 'react';
import { Game } from '../api/models';

const CatalogPage = () => {
    const [games, setGames] = useState<Game[]>([]);

    useEffect(() => {
        const fetchGames = async () => {
            try {
                const response = await fetch('/api/games');
                const data = await response.json();
                console.log(data);
                setGames(data);
            } catch (error) {
                console.log('Error fetching games:', error);
                console.error('Error fetching games:', error);
            }
        };

        fetchGames();
    }, []);

    return (
        <div>
            <h1>Catalog Page</h1>
            <div className="game-cards">
                {games.map((game: Game) => (
                    <div key={game.id} className="game-card">
                        <h2>{game.name}</h2>
                        <p>{game.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CatalogPage;

