/*
  Warnings:

  - Added the required column `designer_id` to the `postsDesigner` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "postsDesigner" ADD COLUMN     "designer_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "postsDesigner" ADD CONSTRAINT "postsDesigner_designer_id_fkey" FOREIGN KEY ("designer_id") REFERENCES "usersDesigner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
