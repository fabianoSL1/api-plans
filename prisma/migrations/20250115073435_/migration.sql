/*
  Warnings:

  - Added the required column `available` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `registeredAt` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "products" ADD COLUMN     "available" BOOLEAN NOT NULL,
ADD COLUMN     "registeredAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "removedAt" TIMESTAMP(3);
