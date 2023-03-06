/*
  Warnings:

  - Made the column `userId` on table `Review` required. This step will fail if there are existing NULL values in that column.
  - Made the column `bookId` on table `Review` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Review" ALTER COLUMN "userId" SET NOT NULL,
ALTER COLUMN "bookId" SET NOT NULL;
