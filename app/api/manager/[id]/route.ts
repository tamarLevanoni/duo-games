import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { GL_DETAILS, USER_CONTACT_FIELDS } from "@/app/stores/types";

const prisma = new PrismaClient();

export async function GET(
  req: NextApiRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;

  try {
    const location = await prisma.location.findUnique({
      where: {
        managerId: id as string, // type casting the id to string
      },
      include: {
        gls: {
          select: {
            id: true,
            status: true,
            expectedReturnDate:true,
            game: {
              include: {
                gls: false,
              },
            },
          },
        },
        leader: USER_CONTACT_FIELDS,
        borrowings: {
          include: {
            borrow: USER_CONTACT_FIELDS,
            gls: GL_DETAILS,
          },
        },
      },
    });

    if (!location) {
      return new NextResponse(
        JSON.stringify({ message: "location not found" }),
        { status: 404 }
      );
    }
    console.log("location Data API:", location);

    return NextResponse.json(location, {
      status: 200,
    });
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
