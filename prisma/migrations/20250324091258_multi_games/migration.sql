/*
  Warnings:

  - You are about to drop the column `glId` on the `Borrowing` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Borrowing" DROP CONSTRAINT "Borrowing_glId_fkey";

-- AlterTable
ALTER TABLE "Borrowing" DROP COLUMN "glId";

-- CreateTable
CREATE TABLE "_BorrowingToGL" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_BorrowingToGL_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_BorrowingToGL_B_index" ON "_BorrowingToGL"("B");

-- AddForeignKey
ALTER TABLE "_BorrowingToGL" ADD CONSTRAINT "_BorrowingToGL_A_fkey" FOREIGN KEY ("A") REFERENCES "Borrowing"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BorrowingToGL" ADD CONSTRAINT "_BorrowingToGL_B_fkey" FOREIGN KEY ("B") REFERENCES "GL"("id") ON DELETE CASCADE ON UPDATE CASCADE;
