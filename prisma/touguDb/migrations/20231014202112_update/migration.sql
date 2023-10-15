/*
  Warnings:

  - You are about to drop the column `salt` on the `PortalUsers` table. All the data in the column will be lost.
  - You are about to drop the column `seqId` on the `PortalUsers` table. All the data in the column will be lost.
  - Made the column `password` on table `PortalUsers` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "PortalUsers_salt_key";

-- DropIndex
DROP INDEX "PortalUsers_seqId_key";

-- AlterTable
ALTER TABLE "PortalUsers" DROP COLUMN "salt",
DROP COLUMN "seqId",
ALTER COLUMN "password" SET NOT NULL;
