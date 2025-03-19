import { NextRequest, NextResponse } from 'next/server';
import { readData } from '../../../../lib/data';

export async function GET(req: NextRequest,{params}:{params:{ id:string }} ) {

  const data = readData();
  const location = data.locations.find((location) => location.id === parseInt(params.id));
  if (!location) {
    return NextResponse.json({ error: 'Location not found' }, { status: 404 });
  }
  return NextResponse.json(location);
}