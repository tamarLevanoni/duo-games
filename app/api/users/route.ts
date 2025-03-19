// pages/api/users/[id].ts
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { NextResponse } from "next/server";


const prisma = new PrismaClient();

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  const data = req.body;
  console.log('Data:', data);
  try {
    const user = await prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        phone: data.phone,
        isAdmin: data.isAdmin,
        isLeader: data.isLeader,
        isManager: data.isManager,
      },
    });
    return new NextResponse(JSON.stringify(user), { status: 201 });
  } catch (error) {
    console.error("Unexpected server error:", error);
    return new NextResponse(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect(); // Always disconnect when you're done
  }
}

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    const users = await prisma.user.findMany();
    return new NextResponse(JSON.stringify(users), { status: 200 });
  } catch (error) {
    console.error("Unexpected server error:", error);
    return new NextResponse(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect(); // Always disconnect when you're done
  }
}




