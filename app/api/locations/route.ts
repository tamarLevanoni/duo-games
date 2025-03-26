// pages/api/users/[id].ts
import { type NextRequest,NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client';
import { getServerSession } from "next-auth";
// import { authOptions } from "@/app/lib/auth";
import { LocationInfo, USER_CONTACT_FIELDS } from '../../stores/types';
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const prisma = new PrismaClient();

export async function GET(
  req: NextRequest
): Promise<NextResponse<LocationInfo[] | { message: string }>> {
  try {
   const locations= await prisma.location.findMany({
      include: {
        manager: USER_CONTACT_FIELDS,
    }})

    return NextResponse.json(locations, { status: 200 });
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

