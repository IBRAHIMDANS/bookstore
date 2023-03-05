/*
  Warnings:

  - You are about to drop the column `plublicationYear` on the `Book` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[firstName,lastName,fullName]` on the table `Author` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[title,publicationYear,language]` on the table `Book` will be added. If there are existing duplicate values, this will fail.
  - Made the column `fullName` on table `Author` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "Author_fullName_key";

-- DropIndex
DROP INDEX "Book_title_plublicationYear_language_key";

-- AlterTable
ALTER TABLE "Author" ALTER COLUMN "fullName" SET NOT NULL;

-- AlterTable
ALTER TABLE "Book" DROP COLUMN "plublicationYear",
ADD COLUMN     "publicationYear" INTEGER NOT NULL DEFAULT 2023;

-- CreateIndex
CREATE UNIQUE INDEX "Author_firstName_lastName_fullName_key" ON "Author"("firstName", "lastName", "fullName");

-- CreateIndex
CREATE UNIQUE INDEX "Book_title_publicationYear_language_key" ON "Book"("title", "publicationYear", "language");
