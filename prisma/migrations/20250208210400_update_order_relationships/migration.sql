-- CreateTable
CREATE TABLE "orders" (
    "id" UUID NOT NULL,
    "status" TEXT NOT NULL,
    "transaction_id" TEXT,
    "total_amount" INTEGER NOT NULL,
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "user_client_id" UUID NOT NULL,
    "product_id" UUID NOT NULL,
    "user_designer_id" UUID NOT NULL,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_user_client_id_fkey" FOREIGN KEY ("user_client_id") REFERENCES "usersClient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "postsDesigner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_user_designer_id_fkey" FOREIGN KEY ("user_designer_id") REFERENCES "usersDesigner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
