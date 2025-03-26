/*
  Warnings:

  - You are about to drop the column `expectedReturnDate` on the `Borrowing` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Borrowing" DROP COLUMN "expectedReturnDate";

-- AlterTable
ALTER TABLE "GL" ADD COLUMN     "expectedReturnDate" TIMESTAMP(3);
