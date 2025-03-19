/*
  Warnings:

  - A unique constraint covering the columns `[managerId]` on the table `Location` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Location_managerId_key" ON "Location"("managerId");
