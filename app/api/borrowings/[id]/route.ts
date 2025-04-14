import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import { ApproveBorrowRequest } from "@/app/stores/types";

const prisma = new PrismaClient();

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user.role?.isManager)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const data = await req.json();
    const borrowingData: ApproveBorrowRequest = {
        id: data.id,
        gls: data.gls,
        rentalDate: data.rentalDate,
        status: data.status,
        returnDate: data.returnDate,
      };
    const id = (await params).id;
    // אפשרות להוסיף כאן בדיקה האם ההשאלה שייכת לרכז
    // const borrowing = await prisma.borrowing.findUnique({ where: { id } });
    // if (borrowing?.managerId !== session.user.id) {
    //   return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    // }
    const updated = await prisma.borrowing.update({
      where: { id: id as string },
      data: {
        ...borrowingData,
        gls: {
        set:[],
          connect: borrowingData.gls.map((gl) => ({ id: gl.id } as any)),
          updateMany: borrowingData.gls.map((gl) => ({
            where: { id: gl.id },
            data: {
              status: gl.status,
              expectedReturnDate: gl.expectedReturnDate,
            },
          })),
        },
      },
    });
    return NextResponse.json({ success: true, borrowing: updated });
  } catch (error) {
    console.error("Unexpected server error:", error);
    return new NextResponse(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, statusText: "Internal server error" }
    );
  } finally {
    await prisma.$disconnect(); // Always disconnect when you're done
  }
}
