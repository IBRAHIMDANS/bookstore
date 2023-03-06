/*
  Warnings:

  - You are about to drop the column `note` on the `Review` table. All the data in the column will be lost.
  - Added the required column `rating` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "AuthenticationType" ADD VALUE 'APPLE';

-- AlterTable
ALTER TABLE "Book" ADD COLUMN     "coverImage" TEXT,
ADD COLUMN     "verified" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Review" DROP COLUMN "note",
ADD COLUMN     "rating" INTEGER NOT NULL;
