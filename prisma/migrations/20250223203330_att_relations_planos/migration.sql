-- AlterTable
ALTER TABLE "usersClient" ADD COLUMN     "endDate" TIMESTAMP(3),
ADD COLUMN     "planId" UUID,
ADD COLUMN     "startDate" TIMESTAMP(3),
ADD COLUMN     "status" TEXT;

-- CreateTable
CREATE TABLE "plans" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "tag" TEXT NOT NULL,
    "benefits" TEXT NOT NULL,
    "maxDownloads" INTEGER NOT NULL,

    CONSTRAINT "plans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "download_logs" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "imageId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "download_logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "plans_name_key" ON "plans"("name");

-- CreateIndex
CREATE UNIQUE INDEX "plans_tag_key" ON "plans"("tag");

-- AddForeignKey
ALTER TABLE "usersClient" ADD CONSTRAINT "usersClient_planId_fkey" FOREIGN KEY ("planId") REFERENCES "plans"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "download_logs" ADD CONSTRAINT "download_logs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "usersClient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
