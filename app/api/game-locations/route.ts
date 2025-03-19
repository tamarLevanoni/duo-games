import { NextRequest, NextResponse } from 'next/server';
import { readData, writeData } from '../../../lib/data';
import { GameLocation, User, Game } from '../models';

export async function GET() {
  const data = readData();
  // const gameLocations = data.game_location.map((gameLocation) => {
  //   const location = data.locations.find((location) => location.id === gameLocation.location.id);
  //   const game = data.games.find((game) => game.id === gameLocation.game.id);
  //   return {
  //     ...gameLocation,
  //     location,
  //     game,
  //   };
  // });
  return NextResponse.json(data.game_location);
}

export async function POST(req: NextRequest) {
  const data = readData();
  const { location, game, expected_return, status, current_borrowing_id } = await req.json();
  
  const newGameLocation: GameLocation = {
    id: data.game_location.length > 0 ? data.game_location[data.game_location.length - 1].id + 1 : 1,
    game,
    location,
    expected_return,
    status,
    current_borrowing_id
  };
  data.game_location.push(newGameLocation);
  writeData(data);
  return NextResponse.json(newGameLocation, { status: 201 });
}
