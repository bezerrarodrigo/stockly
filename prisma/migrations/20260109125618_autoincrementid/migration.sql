/*
  Warnings:

  - The primary key for the `Product` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Product` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Sale` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Sale` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `SaleProduct` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `SaleProduct` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `saleId` on the `SaleProduct` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `productId` on the `SaleProduct` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "SaleProduct" DROP CONSTRAINT "SaleProduct_productId_fkey";

-- DropForeignKey
ALTER TABLE "SaleProduct" DROP CONSTRAINT "SaleProduct_saleId_fkey";

-- AlterTable
ALTER TABLE "Product" DROP CONSTRAINT "Product_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Product_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Sale" DROP CONSTRAINT "Sale_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Sale_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "SaleProduct" DROP CONSTRAINT "SaleProduct_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "saleId",
ADD COLUMN     "saleId" INTEGER NOT NULL,
DROP COLUMN "productId",
ADD COLUMN     "productId" INTEGER NOT NULL,
ADD CONSTRAINT "SaleProduct_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "SaleProduct" ADD CONSTRAINT "SaleProduct_saleId_fkey" FOREIGN KEY ("saleId") REFERENCES "Sale"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SaleProduct" ADD CONSTRAINT "SaleProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
