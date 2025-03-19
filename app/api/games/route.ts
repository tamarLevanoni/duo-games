import { NextRequest, NextResponse } from 'next/server';
import { readData, writeData } from '../../../lib/data';
import { Game } from '../models';

export async function GET() {
  const data = readData();
  return NextResponse.json(data.games);
}

export async function POST(req: NextRequest) {
  const data = readData();
  const { name, category, description, image } = await req.json();
  const newGame: Game = {
    id: data.games.length + 1,
    name,
    category,
    description,
    image,
  };
  data.games.push(newGame);
  writeData(data);
  return NextResponse.json(newGame, { status: 201 });
}