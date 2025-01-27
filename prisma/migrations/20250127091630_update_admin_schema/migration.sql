/*
  Warnings:

  - You are about to drop the column `status` on the `admins` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "admins" DROP COLUMN "status",
ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false;
