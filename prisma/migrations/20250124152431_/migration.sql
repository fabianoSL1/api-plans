/*
  Warnings:

  - You are about to drop the column `available` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `planId` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `registeredAt` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `removedAt` on the `products` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_planId_fkey";

-- AlterTable
ALTER TABLE "products" DROP COLUMN "available",
DROP COLUMN "planId",
DROP COLUMN "registeredAt",
DROP COLUMN "removedAt";

-- CreateTable
CREATE TABLE "products_history" (
    "planId" TEXT NOT NULL,
    "productId" INTEGER NOT NULL,
    "available" BOOLEAN NOT NULL,
    "registeredAt" TIMESTAMP(3) NOT NULL,
    "removedAt" TIMESTAMP(3),

    CONSTRAINT "products_history_pkey" PRIMARY KEY ("planId","productId")
);

-- AddForeignKey
ALTER TABLE "products_history" ADD CONSTRAINT "products_history_planId_fkey" FOREIGN KEY ("planId") REFERENCES "plans"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products_history" ADD CONSTRAINT "products_history_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
