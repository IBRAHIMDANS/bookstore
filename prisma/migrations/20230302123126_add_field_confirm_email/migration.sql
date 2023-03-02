-- AlterTable
alter table "User" add column     "isEmailVerified" BOOLEAN NOT NULL DEFAULT false,
alter COLUMN "isActive" SET DEFAULT false;
