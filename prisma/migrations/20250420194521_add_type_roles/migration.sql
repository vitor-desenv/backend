-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('CLIENT', 'DEVELOPER');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('USER', 'MODERATOR', 'ADMIN');

-- AlterTable
ALTER TABLE "usersDesigner" ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'USER',
ADD COLUMN     "type" "UserType" NOT NULL DEFAULT 'CLIENT';
