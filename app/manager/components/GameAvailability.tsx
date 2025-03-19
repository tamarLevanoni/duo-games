import React from 'react';
import useManagerStore from '@/app/stores/managerStore';

const GameAvailability = () => {
  const gls = useManagerStore((state) => state.gls);

  return (
    <div className="w-full mb-4">
      <h2 className="text-xl mb-2">טבלת זמינות משחקים</h2>
      <table className="min-w-full bg-white mb-4">
        <thead>
          <tr>
        <th className="py-2">Name</th>
        <th className="py-2">Category</th>
        <th className="py-2">Description</th>
        <th className="py-2">Image</th>
        <th className="py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {gls.map((item) => (
        <tr key={item.id}>
          <td className="py-2">{item.game.name}</td>
          <td className="py-2">{item.game.category}</td>
          <td className="py-2">{item.game.desc}</td>
          <td className="py-2">
            <img src={item.game.img||undefined} alt={item.game.name} className="w-16 h-16 object-cover" />
          </td>
          <td className="py-2">{item.status}</td>
        </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GameAvailability;