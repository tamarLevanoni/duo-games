import React from 'react';

const GameAvailability = () => {
  const fakeData = [
    { id: 1, name: 'Game 1', available: 5 },
    { id: 2, name: 'Game 2', available: 2 },
    { id: 3, name: 'Game 3', available: 0 },
  ];

  return (
    <div className="w-full mb-4">
      <h2 className="text-xl mb-2">טבלת זמינות משחקים</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">Game</th>
            <th className="py-2">Available</th>
          </tr>
        </thead>
        <tbody>
          {fakeData.map((item) => (
            <tr key={item.id}>
              <td className="py-2">{item.name}</td>
              <td className="py-2">{item.available}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GameAvailability;