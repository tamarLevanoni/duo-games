import { NextRequest,NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";

const prisma = new PrismaClient();

export async function PUT(req: NextRequest, {params}:{ params: Promise<{ id: string }> }) {
    
    try {
        const session = await getServerSession(authOptions);
          if (!session?.user.role?.isManager)
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const data =await req.json();
        const  id  = (await params).id;
        const borrowing = await prisma.borrowing.update({
        where: { id: id as string },
        data,
        });
        return new NextResponse(JSON.stringify(borrowing), { status: 200 });
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