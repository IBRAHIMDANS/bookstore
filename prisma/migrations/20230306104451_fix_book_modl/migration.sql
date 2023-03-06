/*
  Warnings:

  - Made the column `language` on table `Book` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Book" ALTER COLUMN "description" SET DEFAULT 'No description',
ALTER COLUMN "language" SET NOT NULL;
