/*
  Warnings:

  - Changed the type of `category` on the `Game` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Game" DROP COLUMN "category",
ADD COLUMN     "category" "GameCategory" NOT NULL;
