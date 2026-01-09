/*
  Warnings:

  - The primary key for the `Product` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `status` on the `Product` table. All the data in the column will be lost.
  - The primary key for the `Sale` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `SaleProduct` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "SaleProduct" DROP CONSTRAINT "SaleProduct_productId_fkey";

-- DropForeignKey
ALTER TABLE "SaleProduct" DROP CONSTRAINT "SaleProduct_saleId_fkey";

-- AlterTable
ALTER TABLE "Product" DROP CONSTRAINT "Product_pkey",
DROP COLUMN "status",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Product_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Product_id_seq";

-- AlterTable
ALTER TABLE "Sale" DROP CONSTRAINT "Sale_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Sale_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Sale_id_seq";

-- AlterTable
ALTER TABLE "SaleProduct" DROP CONSTRAINT "SaleProduct_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "saleId" SET DATA TYPE TEXT,
ALTER COLUMN "productId" SET DATA TYPE TEXT,
ADD CONSTRAINT "SaleProduct_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "SaleProduct_id_seq";

-- AddForeignKey
ALTER TABLE "SaleProduct" ADD CONSTRAINT "SaleProduct_saleId_fkey" FOREIGN KEY ("saleId") REFERENCES "Sale"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SaleProduct" ADD CONSTRAINT "SaleProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
