/*
  Warnings:

  - A unique constraint covering the columns `[userId,deviceId]` on the table `RefreshToken` will be added. If there are existing duplicate values, this will fail.
  - Made the column `deviceId` on table `RefreshToken` required. This step will fail if there are existing NULL values in that column.
  - Made the column `tokenHash` on table `RefreshToken` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `RefreshToken` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "RefreshToken" ALTER COLUMN "deviceId" SET NOT NULL,
ALTER COLUMN "tokenHash" SET NOT NULL,
ALTER COLUMN "updatedAt" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "RefreshToken_userId_deviceId_key" ON "RefreshToken"("userId", "deviceId");
