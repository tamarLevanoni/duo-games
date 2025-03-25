// import { NextRequest, NextResponse } from 'next/server';
// import { readData, writeData } from '../../../lib/data';
// import { Borrowing } from '../models';

// export async function GET(req: NextRequest) {
//   const data = readData();
//   const { searchParams } = new URL(req.url);
//   const userId = searchParams.get('userId');

//   if (userId) {
//     const userBorrowings = data.borrowings.filter((borrowing) => borrowing.user.id === parseInt(userId));
//     return NextResponse.json(userBorrowings);
//   }

//   return NextResponse.json(data.borrowings);
// }

// export async function POST(req: NextRequest) {
//   const data = readData();
//   const { user_id, game_id, rental_date, return_date, status } = await req.json();
//   const user = data.users.find((u) => u.id === user_id);
//   const game = data.games.find((g) => g.id === game_id);
//   if (!user || !game) {
//     return NextResponse.json({ error: 'User or Game not found' }, { status: 404 });
//   }
//   const newBorrowing: Borrowing = {
//     user,
//     game,
//     rental_date,
//     excepted_return_date: return_date,
//     return_date: null,
//     status,
//   };
//   data.borrowings.push(newBorrowing);
//   writeData(data);
//   return NextResponse.json(newBorrowing, { status: 201 });
// }