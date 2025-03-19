-- CreateEnum
CREATE TYPE "GameStatus" AS ENUM ('Available', 'Borrowed', 'Damaged');

-- CreateEnum
CREATE TYPE "BorrowingStatus" AS ENUM ('Requested', 'Borrowed', 'Late', 'Returned');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "isAdmin" BOOLEAN NOT NULL,
    "isLeader" BOOLEAN NOT NULL,
    "isManager" BOOLEAN NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Borrowing" (
    "id" TEXT NOT NULL,
    "borrowId" TEXT NOT NULL,
    "glId" TEXT NOT NULL,
    "locationId" TEXT NOT NULL,
    "rentalDate" TIMESTAMP(3),
    "expectedReturnDate" TIMESTAMP(3),
    "returnDate" TIMESTAMP(3),
    "status" "BorrowingStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Borrowing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Game" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "img" TEXT NOT NULL,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GL" (
    "id" TEXT NOT NULL,
    "gameId" TEXT NOT NULL,
    "locationId" TEXT NOT NULL,
    "status" "GameStatus" NOT NULL,

    CONSTRAINT "GL_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Location" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "leaderId" TEXT NOT NULL,
    "managerId" TEXT NOT NULL,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Borrowing" ADD CONSTRAINT "Borrowing_borrowId_fkey" FOREIGN KEY ("borrowId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Borrowing" ADD CONSTRAINT "Borrowing_glId_fkey" FOREIGN KEY ("glId") REFERENCES "GL"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Borrowing" ADD CONSTRAINT "Borrowing_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GL" ADD CONSTRAINT "GL_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GL" ADD CONSTRAINT "GL_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_leaderId_fkey" FOREIGN KEY ("leaderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_managerId_fkey" FOREIGN KEY ("managerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
