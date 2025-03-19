import { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase from '../../lib/mongodb';
import User from '@/app/api/types/userTypes';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await connectToDatabase();

  try {
    const users = await User.find({}).populate('borrowings'); // שליפת כל המשתמשים
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

export default handler;

// import { NextRequest, NextResponse } from 'next/server';
// import { readData, writeData } from '../../lib/data';
// import { User } from '../models';

// export async function GET() {
//   const data = readData();
  
//   return NextResponse.json(data.users);
// }

// export async function POST(req: NextRequest) {
//   const data = readData();
//   const { name, email, phone, isAdmin, isLeader, isManager } = await req.json();
//   const newUser: User = {
//     id: data.users.length > 0 ? data.users[data.users.length - 1].id + 1 : 1,
//     name,
//     email,
//     phone,
//     isAdmin,
//     isLeader,
//     isManager,
//     borrowings_ids: [],
//   };
//   data.users.push(newUser);
//   writeData(data);
//   return NextResponse.json(newUser, { status: 201 });
// }