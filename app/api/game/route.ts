import { NextRequest, NextResponse } from 'next/server';
import { readData, writeData } from '../../../lib/data';
import { Borrowing, User, Game } from '../models';

export async function GET() {
  const data = readData();
  const borrowings = data.borrowings.map((borrowing) => {
    const user = data.users.find((user) => user.id === borrowing.user);
    const game = data.games.find((game) => game.id === borrowing.game);
    return {
      ...borrowing,
      user,
      game,
    };
  });
  return NextResponse.json(borrowings);
}

export async function POST(req: NextRequest) {
  const data = readData();
  const { user, game, location_id, rental_date, return_date, status } = await req.json();
  const userObj = data.users.find((u) => u.id === user);
  const gameObj = data.games.find((g) => g.id === game);
  if (!userObj || !gameObj) {
    return NextResponse.json({ error: 'User or Game not found' }, { status: 404 });
  }
  const newBorrowing: Borrowing = {
    id: data.borrowings.length > 0 ? data.borrowings[data.borrowings.length - 1].id + 1 : 1,
    user,
    game,
    location_id,
    rental_date,
    return_date,
    status,
  };
  data.borrowings.push(newBorrowing);
  writeData(data);
  return NextResponse.json(newBorrowing, { status: 201 });
}