-- CreateEnum
CREATE TYPE "Category" AS ENUM ('HomeLiving', 'Technology', 'Gaming', 'Hobbies', 'Style', 'Learning', 'Experiences', 'Wellness', 'Personal');

-- CreateTable
CREATE TABLE "Item" (
    "id" SERIAL NOT NULL,
    "ownerId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "category" "Category" NOT NULL,
    "addDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastUpdatedDate" TIMESTAMP(3) NOT NULL,
    "link" TEXT NOT NULL,
    "listId" INTEGER,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "List" (
    "id" SERIAL NOT NULL,
    "ownerId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "category" "Category" NOT NULL,

    CONSTRAINT "List_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_listId_fkey" FOREIGN KEY ("listId") REFERENCES "List"("id") ON DELETE SET NULL ON UPDATE CASCADE;
