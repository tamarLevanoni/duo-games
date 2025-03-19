import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextApiRequest, { params }: { params: { id: string } }) {
  const id = params.id;

  try {
    const manager = await prisma.user.findUnique({
      where: {
        id: id as string, // type casting the id to string
      },
      include: {
        LocationManager: {
          include: {
            gls: {
              include: {
                game: true,
                location: true,
              },
            }
          },
        },
      },
    });

    if (!manager) {
      return new NextResponse(
        JSON.stringify({ message: "Manager not found" }),
        { status: 404 }
      );
    }
    console.log('Manager Data API:', manager);

    return new NextResponse(JSON.stringify(manager), { status: 200 });

  } catch (error) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect(); // Always disconnect when you're done
  }
}