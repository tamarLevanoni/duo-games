import React from 'react';

const BorrowingManagement = () => {
  const fakeData = [
    { id: 1, name: 'Game 1', status: 'Available' },
    { id: 2, name: 'Game 2', status: 'Borrowed' },
    { id: 3, name: 'Game 3', status: 'Damaged' },
  ];

  return (
    <div className="w-full mb-4">
      <h2 className="text-xl mb-2">ניהול השאלות</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">Game</th>
            <th className="py-2">Status</th>
            <th className="py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {fakeData.map((item) => (
            <tr key={item.id}>
              <td className="py-2">{item.name}</td>
              <td className="py-2">{item.status}</td>
              <td className="py-2">
                <button className="bg-blue-500 text-white px-2 py-1 rounded">Change Status</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BorrowingManagement;