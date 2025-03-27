-- AlterTable
ALTER TABLE "Borrowing" ALTER COLUMN "status" SET DEFAULT 'Requested';

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "isAdmin" SET DEFAULT false,
ALTER COLUMN "isLeader" SET DEFAULT false,
ALTER COLUMN "isManager" SET DEFAULT false;
