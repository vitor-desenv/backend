/*
  Warnings:

  - You are about to drop the column `posts_id` on the `postsDesigner` table. All the data in the column will be lost.
  - Added the required column `designer_id` to the `postsDesigner` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "postsDesigner" DROP CONSTRAINT "postsDesigner_posts_id_fkey";

-- AlterTable
ALTER TABLE "postsDesigner" DROP COLUMN "posts_id",
ADD COLUMN     "designer_id" TEXT NOT NULL,
ALTER COLUMN "amount" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "postsDesigner" ADD CONSTRAINT "postsDesigner_designer_id_fkey" FOREIGN KEY ("designer_id") REFERENCES "usersDesigner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
