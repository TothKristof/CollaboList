/*
  Warnings:

  - The values [Experiences] on the enum `Category` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `addDate` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `lastUpdatedDate` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `link` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `listId` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Category_new" AS ENUM ('Gaming', 'Technology', 'Personal', 'HomeLiving', 'Learning', 'Style', 'Wellness', 'Hobbies');
ALTER TABLE "Item" ALTER COLUMN "category" TYPE "Category_new" USING ("category"::text::"Category_new");
ALTER TABLE "List" ALTER COLUMN "category" TYPE "Category_new" USING ("category"::text::"Category_new");
ALTER TYPE "Category" RENAME TO "Category_old";
ALTER TYPE "Category_new" RENAME TO "Category";
DROP TYPE "public"."Category_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_listId_fkey";

-- DropIndex
DROP INDEX "User_email_key";

-- AlterTable
ALTER TABLE "Item" DROP COLUMN "addDate",
DROP COLUMN "lastUpdatedDate",
DROP COLUMN "link",
DROP COLUMN "listId";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "createdAt",
DROP COLUMN "password";

-- CreateTable
CREATE TABLE "_ItemToList" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_ItemToList_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_ItemToList_B_index" ON "_ItemToList"("B");

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "List" ADD CONSTRAINT "List_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ItemToList" ADD CONSTRAINT "_ItemToList_A_fkey" FOREIGN KEY ("A") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ItemToList" ADD CONSTRAINT "_ItemToList_B_fkey" FOREIGN KEY ("B") REFERENCES "List"("id") ON DELETE CASCADE ON UPDATE CASCADE;
