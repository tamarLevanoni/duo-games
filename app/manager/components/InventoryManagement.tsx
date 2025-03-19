import React from 'react';

const InventoryManagement = () => {
  const fakeData = [
    { id: 1, name: 'Game 1', stock: 10 },
    { id: 2, name: 'Game 2', stock: 5 },
    { id: 3, name: 'Game 3', stock: 0 },
  ];

  return (
    <div className="w-full mb-4">
      <h2 className="text-xl mb-2">ניהול מלאי ספציפי למוקד</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">Game</th>
            <th className="py-2">Stock</th>
          </tr>
        </thead>
        <tbody>
          {fakeData.map((item) => (
            <tr key={item.id}>
              <td className="py-2">{item.name}</td>
              <td className="py-2">{item.stock}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryManagement;