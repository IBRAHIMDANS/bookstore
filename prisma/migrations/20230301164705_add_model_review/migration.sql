-- CreateTable
create TABLE "Review" (
    "id" TEXT NOT NULL,
    "comment" TEXT,
    "note" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT,
    "bookId" TEXT,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
alter table "Review" add CONSTRAINT "Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON delete CASCADE ON update CASCADE;

-- AddForeignKey
alter table "Review" add CONSTRAINT "Review_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON delete CASCADE ON update CASCADE;
