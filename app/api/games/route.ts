// pages/api/users/[id].ts
import { type NextRequest,NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client';
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import { gamesInfo } from '@/app/stores/types';
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const prisma = new PrismaClient();

export async function GET(
  req: NextRequest
): Promise<NextResponse<gamesInfo[] | { message: string }>> {
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

    return NextResponse.json(games, { status: 200 });
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

