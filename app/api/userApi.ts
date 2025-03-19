// import { NextRequest, NextResponse } from "next/server";
// import { readData, writeData } from "@/lib/data";
// import {
//   Borrowing,
//   GetUserRes,
//   GetBorrowingForBorrowRes,
//   GetGLForBorrowRes,
//   GetUserContactInfo,
//   GetLocationContactInfoRes,
// } from "@/api/models";
// class UserApi {
    
// }
// export async function getUser(
//   req: NextRequest,
//   { params }: { params: Promise<{ id: string }> }
// ) {
//   try {
//     const data = readData();
//     const id = (await params).id
//     const userId = Number(id);

//     if (isNaN(userId)) {
//       return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
//     }

//     const user = data.users.find((user) => user.id === userId);
//     if (!user) {
//       return NextResponse.json({ error: "User not found" }, { status: 404 });
//     }

//     const borrowings: GetBorrowingForBorrowRes[] = data.borrowings
//       .filter((b) => b.borrow_id === userId)
//       .map((borrowing:Borrowing) => {
//         const glTemp = data.gls.find(
//           (gl) => gl.id === borrowing.gl_id
//         );
//         if (!glTemp) throw new Error("Game location not found");

//         const game = data.games.find((game) => game.id === glTemp.game_id);
//         if (!game) throw new Error("Game not found");

//         const locationTemp = data.locations.find(
//           (loc) => loc.id === glTemp.location_id
//         );
//         if (!locationTemp) throw new Error("Location not found");

//         const managerTemp = data.users.find(
//           (manager) => manager.id === locationTemp.manager_id
//         );
//         if (!managerTemp) throw new Error("Manager not found");

//         const manager: GetUserContactInfo = {
//           id: managerTemp.id,
//           name: managerTemp.name,
//           email: managerTemp.email,
//           phone: managerTemp.phone,
//         };

//         const location: GetLocationContactInfoRes = {
//           id: locationTemp.id,
//           name: locationTemp.name,
//           manager,
//         };

//         const gl: GetGLForBorrowRes = {
//           id: glTemp.id,
//           game,
//           location,
//           status: glTemp.status,
//         };

//         return {
//           id: borrowing.id,
//           gl,
//           rental_date: borrowing.rental_date,
//           expected_return_date: borrowing.expected_return_date,
//           return_date: borrowing.return_date,
//           status: borrowing.status,
//         };
//       });

//     const newUser: GetUserRes = {
//       ...user,
//       borrowings,
//     };

//     return NextResponse.json(newUser);
//   } catch (error) {
//     console.error("Unexpected server error:", error);
//     return NextResponse.json(
//       { error: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }


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
