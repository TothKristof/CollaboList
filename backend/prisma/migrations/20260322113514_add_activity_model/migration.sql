-- CreateEnum
CREATE TYPE "ActivityCategory" AS ENUM ('ADD_ITEM', 'UPDATE_ITEM', 'UPDATE_MULTIPLE_ITEM', 'DELETE_ITEM', 'ADD_MEMBER', 'CREATE_LIST');

-- CreateTable
CREATE TABLE "Activity" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "message" TEXT NOT NULL,
    "activityCategory" "ActivityCategory" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
