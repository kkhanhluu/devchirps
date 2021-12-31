/*
  Warnings:

  - A unique constraint covering the columns `[targetId,followerId]` on the table `Follow` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Follow_targetId_followerId_key" ON "Follow"("targetId", "followerId");
