-- CreateTable
CREATE TABLE "Profile" (
    "id" TEXT NOT NULL,
    "auth0AccountId" TEXT NOT NULL,
    "avatar" TEXT NOT NULL,
    "description" TEXT,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "userName" TEXT NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Follow" (
    "id" TEXT NOT NULL,
    "targetId" TEXT NOT NULL,
    "followerId" TEXT NOT NULL,

    CONSTRAINT "Follow_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Profile_auth0AccountId_key" ON "Profile"("auth0AccountId");

-- AddForeignKey
ALTER TABLE "Follow" ADD CONSTRAINT "Follow_targetId_fkey" FOREIGN KEY ("targetId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Follow" ADD CONSTRAINT "Follow_followerId_fkey" FOREIGN KEY ("followerId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
