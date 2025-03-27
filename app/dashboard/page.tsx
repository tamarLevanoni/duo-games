"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { UserFull } from '../stores/types';

const DashboardPage = () => {
  const [user, setUser] = useState<UserFull | null>(null);

  const router = useRouter();


  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      router.push('/login');
      return;
    }

    const fetchData = async () => {
      try {
        const userResponse = await fetch(`/api/users/${userId}`);
        const userData = await userResponse.json();
        setUser(userData);


      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('userId');
    router.push('/login');
  };

  if (!user || !location) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <div>
        <h2>Personal Info</h2>
        <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
        <p>Phone: {user.phone}</p>
      </div>
      <div>
        <h2>Borrowings</h2>
        <ul>
          {user.borrowings.map((borrowing) => (
            <li key={borrowing.id}>
                <p>Game: {borrowing.gls.map((gl)=>gl.game.name).join(",")}</p>
                <p>Status: {borrowing.status}</p>
{/* {                <p>Rental date: {borrowing.rental_date}</p>
                <p>Expected return date: {borrowing.expected_return_date}</p>
                <p>Return date: {borrowing.return_date}</p>} */}
            </li>
          ))}
        </ul>
      </div>
      <button onClick={handleLogout} className="p-2 bg-red-500 text-white rounded">
        Logout
      </button>
    </div>
  );
};

export default DashboardPage;