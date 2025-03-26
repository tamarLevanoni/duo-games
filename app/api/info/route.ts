// pages/api/users/[id].ts
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const prisma = new PrismaClient();

export async function GET(
  req: NextApiRequest
) {
  try {
    const games = await prisma.game.findMany({
      include: {
        gls: {
          select: {
            id: true,
            status: true,
            expectedReturnDate: true,
            locationId: true,
        },
      },
    }});
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Something went wrong!" },
      { status: 500 }
    );

    // return new NextResponse(
    //   JSON.stringify({ message: "Something went wrong!" })
    // );
  } finally {
    await prisma.$disconnect(); // Always disconnect when you're done
  }
}

