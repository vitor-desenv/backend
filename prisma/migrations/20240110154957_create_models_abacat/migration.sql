-- AlterTable
ALTER TABLE "usersClient" ALTER COLUMN "banner" DROP NOT NULL;

-- AlterTable
ALTER TABLE "usersDesigner" ALTER COLUMN "banner" DROP NOT NULL;

-- CreateTable
CREATE TABLE "categories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "create_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "postsDesigner" (
    "id" TEXT NOT NULL,
    "name_art" TEXT NOT NULL,
    "banner" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "amount" INTEGER NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT false,
    "draft" BOOLEAN NOT NULL DEFAULT true,
    "create_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "posts_id" TEXT NOT NULL,
    "category_id" TEXT NOT NULL,

    CONSTRAINT "postsDesigner_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "postsDesigner" ADD CONSTRAINT "postsDesigner_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "postsDesigner" ADD CONSTRAINT "postsDesigner_posts_id_fkey" FOREIGN KEY ("posts_id") REFERENCES "usersDesigner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
