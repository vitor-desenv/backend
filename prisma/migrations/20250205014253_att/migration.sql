/*
  Warnings:

  - The primary key for the `categories` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `postsDesigner` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `designer_id` on the `postsDesigner` table. All the data in the column will be lost.
  - The primary key for the `usersClient` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `usersDesigner` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[name]` on the table `categories` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `usersClient` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `usersDesigner` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `id` on the `categories` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Made the column `create_at` on table `categories` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `categories` required. This step will fail if there are existing NULL values in that column.
  - Changed the type of `id` on the `postsDesigner` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Made the column `create_at` on table `postsDesigner` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `postsDesigner` required. This step will fail if there are existing NULL values in that column.
  - Changed the type of `category_id` on the `postsDesigner` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id` on the `usersClient` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id` on the `usersDesigner` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "postsDesigner" DROP CONSTRAINT "postsDesigner_category_id_fkey";

-- DropForeignKey
ALTER TABLE "postsDesigner" DROP CONSTRAINT "postsDesigner_designer_id_fkey";

-- AlterTable
ALTER TABLE "categories" DROP CONSTRAINT "categories_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
ALTER COLUMN "create_at" SET NOT NULL,
ALTER COLUMN "updated_at" SET NOT NULL,
ALTER COLUMN "updated_at" DROP DEFAULT,
ADD CONSTRAINT "categories_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "postsDesigner" DROP CONSTRAINT "postsDesigner_pkey",
DROP COLUMN "designer_id",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
ALTER COLUMN "create_at" SET NOT NULL,
ALTER COLUMN "updated_at" SET NOT NULL,
ALTER COLUMN "updated_at" DROP DEFAULT,
DROP COLUMN "category_id",
ADD COLUMN     "category_id" UUID NOT NULL,
ADD CONSTRAINT "postsDesigner_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "usersClient" DROP CONSTRAINT "usersClient_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
ALTER COLUMN "updated_at" DROP DEFAULT,
ADD CONSTRAINT "usersClient_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "usersDesigner" DROP CONSTRAINT "usersDesigner_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
ALTER COLUMN "updated_at" DROP DEFAULT,
ADD CONSTRAINT "usersDesigner_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "categories_name_key" ON "categories"("name");

-- CreateIndex
CREATE UNIQUE INDEX "usersClient_email_key" ON "usersClient"("email");

-- CreateIndex
CREATE UNIQUE INDEX "usersDesigner_email_key" ON "usersDesigner"("email");

-- AddForeignKey
ALTER TABLE "postsDesigner" ADD CONSTRAINT "postsDesigner_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;
