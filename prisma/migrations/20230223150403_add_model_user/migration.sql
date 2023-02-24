-- CreateTable
create TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
create TABLE "new_Book" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "plublicationYear" INTEGER NOT NULL DEFAULT 2023,
    "genre" TEXT NOT NULL DEFAULT 'Other',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER,
    CONSTRAINT "Book_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON delete SET NULL ON update CASCADE
);
insert into "new_Book" ("author", "createdAt", "genre", "id", "plublicationYear", "title", "updatedAt") select "author", "createdAt", "genre", "id", "plublicationYear", "title", "updatedAt" from "Book";
drop table "Book";
alter table "new_Book" rename to "Book";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
create unique index "User_email_key" on "User"("email");
