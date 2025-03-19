import { NextRequest, NextResponse } from 'next/server';
import { readData } from '../../../../lib/data';

export async function GET(req: NextRequest,{params}:{params:{ id:string }} ) {

  const data = readData();
  const borrowing = data.borrowings.find((borrowing) => borrowing.id === parseInt(params.id));
  if (!borrowing) {
    return NextResponse.json({ error: 'borrowing not found' }, { status: 404 });
  }
  return NextResponse.json(borrowing);
}