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

export async function GET(
  req: NextApiRequest,
) {
  // const id = (await req.query).id
  const session = await getServerSession(authOptions);
  if (!session?.user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const id = session?.user?.id;
  // const email = (await params).email;
  // const id="c56d7096-fa75-429c-bc7f-3c22db145718";
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: id as string, // type casting the id to string
      },
      include: {
        borrowings: {
          include: {
            gl: GL_DETAILS,
            location: {
              select: {
                name: true,
                manager: USER_CONTACT_FIELDS,
              },
            },
          },
        },
      },
    });

    if (!user) {
      return new NextResponse(JSON.stringify({ message: "user not found" }));
    }
    console.log("User Data APi:", user);

    return new NextResponse(JSON.stringify(user));
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
export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const id = session?.user?.id;
  const data = req.body;
  try {
    if (!data)
      return NextResponse.json(
        { message: "No data provided" },
        { status: 400 }
      );
    const user = await prisma.user.update({
      where: {
        id: id as string,
      },
      data,
    });
    return NextResponse.json(user, { status: 200 });
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

