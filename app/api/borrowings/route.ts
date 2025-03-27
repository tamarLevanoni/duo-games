import { GL_DETAILS, USER_CONTACT_FIELDS } from "@/app/stores/types";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";


const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  
  try {
    const data = await req.json();
    if (!data)
      return NextResponse.json(
        { message: "No data provided" },
        { status: 400 }
      );
    const borrowing = await prisma.borrowing.create({
      data: {
        gls: {
          connect: data.gls.map((id: string) => ({ id })),
        },
        borrow: {
          connect: { id: data.borrowId }, // Assuming `borrowId` is provided in `data`
        },
        location: {
          connect: { id: data.locationId }, // Assuming `locationId` is provided in `data`
        },
      },
    });
    const newBorrowing = await prisma.borrowing.findUnique({
      where: { id: borrowing.id },
      include: {
        gls: GL_DETAILS,
        location: {
          select: {
            name: true,
            manager: USER_CONTACT_FIELDS,
          },
        },
      },
    });
    return NextResponse.json(newBorrowing, { status: 201 });
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
