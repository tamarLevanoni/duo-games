"use client";

import React, { useState } from "react";
import useUserStore from "@/app/stores/userStore";
import useLocaionsStore from "@/app/stores/locationStore";
import useGameStore from "@/app/stores/gameStore";
import { gamesInfo } from "@/app/stores/types";

const UserComponent = () => {
  const user = useUserStore((state) => state.user);
  const borrowings = user?.borrowings || [];
  const locations = useLocaionsStore((state) => state.locations);
  const games = useGameStore((state) => state.games);

  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedGames, setSelectedGames] = useState<string[]>([]);

  // Filter games based on the selected location
const filteredGames = React.useMemo(() => {
    return games.filter((game) =>
        game.gls.some((gl) => gl.locationId === selectedLocation)
    ).map((game)=>{
        const currentGL=game.gls.find((gl)=>gl.locationId===selectedLocation);
        return {...game,currentGL:currentGL!.id};
    });
}, [games, selectedLocation]);

  const handleAddBorrowing = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Adding borrowing:", { selectedLocation, selectedGames });
    useUserStore.getState().addBorrwing(selectedGames,selectedLocation );
    // Add logic to handle borrowing submission
  };

  const handleGameSelection = (currentGL: string) => {
    console.log("Game selected:", currentGL);
    setSelectedGames((prevSelectedGames) =>
      prevSelectedGames.includes(currentGL)
        ? prevSelectedGames.filter((id) => id !== currentGL)
        : [...prevSelectedGames, currentGL]
    );
  };

  return (
    <div className="p-4">
      {/* User Details */}
      <h2 className="text-2xl font-bold mb-4">User Details</h2>
      <div className="mb-4">
        <p><strong>Name:</strong> {user?.name}</p>
        <p><strong>Email:</strong> {user?.email}</p>
        <p><strong>Phone:</strong> {user?.phone}</p>
      </div>

      {/* Borrowings */}
      <h2 className="text-2xl font-bold mb-4">Borrowings</h2>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Game</th>
            <th className="py-2 px-4 border-b">Location</th>
            <th className="py-2 px-4 border-b">Status</th>
          </tr>
        </thead>
        <tbody>
          {borrowings.map((borrowing) =>
            borrowing.gls.map((gl) => (
              <tr
                key={gl.id}
                className={
                  borrowing.status === "Requested"
                    ? "bg-yellow-100"
                    : borrowing.status === "Borrowed"
                    ? "bg-blue-100"
                    : borrowing.status === "Late"
                    ? "bg-red-100"
                    : ""
                }
              >
                <td className="py-2 px-4 border-b">{gl.game?.name}</td>
                <td className="py-2 px-4 border-b">{borrowing.location?.name}</td>
                <td className="py-2 px-4 border-b">{borrowing.status}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Add Borrowing Form */}
      <h2 className="text-2xl font-bold mt-8 mb-4">Add Borrowing</h2>
      <form onSubmit={handleAddBorrowing} className="bg-gray-100 p-4 rounded shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Location</label>
          <select
            value={selectedLocation}
            onChange={(e) => {
              setSelectedLocation(e.target.value);
            //   setSelectedGames([]); // Reset selected games when location changes
            }}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="">Select a location</option>
            {locations.map((location) => (
              <option key={location.id} value={location.id}>
                {location.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Games</label>
          <div className="border border-gray-300 rounded p-2">
            {filteredGames.map((game) => (
              <div key={game.id} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id={`game-${game.id}`}
                  value={game.id}
                  checked={selectedGames.includes(game.currentGL)}
                  onChange={() => handleGameSelection(game.currentGL)}
                  className="mr-2"
                />
                <label htmlFor={`game-${game.id}`} className="text-gray-700">
                  {game.name}
                </label>
              </div>
            ))}
            {filteredGames.length === 0 && (
              <p className="text-gray-500">No games available for the selected location.</p>
            )}
          </div>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Borrowing
        </button>
      </form>
    </div>
  );
};

export default UserComponent;