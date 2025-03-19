import React from 'react';

const AddBorrowing = () => {
  return (
    <div className="w-full mb-4">
      <h2 className="text-xl mb-2">הוספת השאלה</h2>
      <form className="bg-white p-4 rounded shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700">Game Name</label>
          <input type="text" className="w-full p-2 border border-gray-300 rounded" />
        </div>
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Add Borrowing</button>
      </form>
    </div>
  );
};

export default AddBorrowing;