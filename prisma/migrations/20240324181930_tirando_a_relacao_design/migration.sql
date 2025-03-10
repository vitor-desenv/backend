/*
  Warnings:

  - You are about to drop the column `amount` on the `postsDesigner` table. All the data in the column will be lost.
  - You are about to drop the column `designer_id` on the `postsDesigner` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "postsDesigner" DROP CONSTRAINT "postsDesigner_designer_id_fkey";

-- AlterTable
ALTER TABLE "postsDesigner" DROP COLUMN "amount",
DROP COLUMN "designer_id";
