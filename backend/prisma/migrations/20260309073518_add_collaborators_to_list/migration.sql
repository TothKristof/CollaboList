/*
  Warnings:

  - You are about to drop the column `ownerId` on the `List` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "ListRole" AS ENUM ('OWNER', 'COLLABORATOR', 'GUEST');

-- DropForeignKey
ALTER TABLE "List" DROP CONSTRAINT "List_ownerId_fkey";

-- AlterTable
ALTER TABLE "List" DROP COLUMN "ownerId";

-- CreateTable
CREATE TABLE "ListUser" (
    "userId" INTEGER NOT NULL,
    "listId" INTEGER NOT NULL,
    "role" "ListRole" NOT NULL DEFAULT 'GUEST',

    CONSTRAINT "ListUser_pkey" PRIMARY KEY ("userId","listId")
);

-- AddForeignKey
ALTER TABLE "ListUser" ADD CONSTRAINT "ListUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ListUser" ADD CONSTRAINT "ListUser_listId_fkey" FOREIGN KEY ("listId") REFERENCES "List"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
