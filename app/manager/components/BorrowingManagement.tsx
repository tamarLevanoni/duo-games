import React from 'react';
import useManagerStore from '@/app/stores/managerStore';


const BorrowingManagement = () => {
  const borrowings = useManagerStore((state) => state.borrowings);

  return (
    <div className="w-full mb-4">
      <h2 className="text-xl mb-2">ניהול השאלות</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">שם הלוקח</th>
            <th className="py-2">שם המשחק</th>
            <th className="py-2">סטטוס</th>
          </tr>
        </thead>
        <tbody>
          {borrowings.map((item) => (
            <tr key={item.id}>
              <td className="py-2">{item.borrow.name}</td>
              <td className="py-2">{item.gl.game.name}</td>
              <td className="py-2">{item.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BorrowingManagement;