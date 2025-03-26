// pages/api/users/[id].ts
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import {
  GL_DETAILS,
  USER_CONTACT_FIELDS,
  UserContactInfo,
} from "@/app/stores/types";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  
  // const { name, email, phone } = await req.json();
  try {
    const data = await req.json();
    if (!data)
      return NextResponse.json(
        { message: "No data provided" },
        { status: 400 }
      );
    const user = await prisma.user.create({
      data,
    });
    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Something went wrong!" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
