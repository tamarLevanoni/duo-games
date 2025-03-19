// pages/api/users/[id].ts
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { NextResponse } from "next/server";


const prisma = new PrismaClient();

export async function GET(req: NextApiRequest,  { params }: { params: Promise<{ id: string }> }) {
  // const id = (await req.query).id
  const id = (await params).id;
// const id="c56d7096-fa75-429c-bc7f-3c22db145718";
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: id as string, // type casting the id to string
      },
      include: {
        borrowings: {
          include: {
            gl: {
              include: {
                game: true,
                location: {
                  include: {
                    manager: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!user) {
      return new NextResponse(
        JSON.stringify({ message: "user not found" })
      );
    }
    console.log('User Data APi:', user);
    
    return new NextResponse(JSON.stringify(user));

  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Something went wrong!" }, { status: 500 });

    // return new NextResponse(
    //   JSON.stringify({ message: "Something went wrong!" })
    // );
  } finally {
    await prisma.$disconnect(); // Always disconnect when you're done
  }
}


// export async function PUT(
//   req: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   const data = readData();
//   const userIndex = data.users.findIndex(
//     (user) => user.id === parseInt(params.id)
//   );
//   if (userIndex === -1) {
//     return NextResponse.json({ error: "User not found" }, { status: 404 });
//   }
//   const { name, email, phone, isAdmin, isLeader, isManager } = await req.json();
//   data.users[userIndex] = {
//     ...data.users[userIndex],
//     name,
//     email,
//     phone,
//     isAdmin,
//     isLeader,
//     isManager,
//   };
//   writeData(data);
//   return NextResponse.json(data.users[userIndex]);
// }

// export async function DELETE(
//   req: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   const data = readData();
//   const userIndex = data.users.findIndex(
//     (user) => user.id === parseInt(params.id)
//   );
//   if (userIndex === -1) {
//     return NextResponse.json({ error: "User not found" }, { status: 404 });
//   }
//   data.users.splice(userIndex, 1);
//   writeData(data);
//   return NextResponse.json({ message: "User deleted successfully" });
// }
