// import { NextRequest, NextResponse } from 'next/server';
// import { readData, writeData } from '../../../lib/data';
// import { Location } from '../models';

// export async function GET(req: NextRequest) {
//   const data = readData();
//   const { searchParams } = new URL(req.url);
//   const locationId = searchParams.get('locationId');

//   if (locationId) {
//     const location = data.locations.find((loc) => loc.id === parseInt(locationId));
//     if (!location) {
//       return NextResponse.json({ error: 'Location not found' }, { status: 404 });
//     }
//     return NextResponse.json(location);
//   }

//   return NextResponse.json(data.locations);
// }

// export async function POST(req: NextRequest) {
//   const data = readData();
//   const { name, admin_id, leader_id } = await req.json();
//   const admin = data.users.find((u) => u.id === admin_id);
//   const leader = data.users.find((u) => u.id === leader_id);
//   if (!admin || !leader) {
//     return NextResponse.json({ error: 'Admin or Leader not found' }, { status: 404 });
//   }
//   const newLocation: Location = {
//     id: data.locations.length > 0 ? data.locations[data.locations.length - 1].id + 1 : 1,
//     name,
//     admin,
//     leader,
//     games: [],
//     borrowings: [],
//   };
//   data.locations.push(newLocation);
//   writeData(data);
//   return NextResponse.json(newLocation, { status: 201 });
// }