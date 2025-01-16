-- CreateTable
CREATE TABLE "User" (
    "name" TEXT NOT NULL,
    "registeredAt" TIMESTAMP(3) NOT NULL,
    "lastAuth" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_name_key" ON "User"("name");
