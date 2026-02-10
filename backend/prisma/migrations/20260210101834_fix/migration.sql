/*
  Warnings:

  - You are about to drop the `_ItemToList` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `addDate` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastUpdatedDate` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `link` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_ItemToList" DROP CONSTRAINT "_ItemToList_A_fkey";

-- DropForeignKey
ALTER TABLE "_ItemToList" DROP CONSTRAINT "_ItemToList_B_fkey";

-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "addDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "lastUpdatedDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "link" TEXT NOT NULL,
ADD COLUMN     "listId" INTEGER;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "password" TEXT NOT NULL;

-- DropTable
DROP TABLE "_ItemToList";

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_listId_fkey" FOREIGN KEY ("listId") REFERENCES "List"("id") ON DELETE SET NULL ON UPDATE CASCADE;
