/*
  Warnings:

  - The primary key for the `prices` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `prices` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `pricing_id` on the `pricing_items` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `pricing_id` on the `pricing_observations` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "pricing_items" DROP CONSTRAINT "pricing_items_pricing_id_fkey";

-- DropForeignKey
ALTER TABLE "pricing_observations" DROP CONSTRAINT "pricing_observations_pricing_id_fkey";

-- AlterTable
ALTER TABLE "prices" DROP CONSTRAINT "prices_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "prices_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "pricing_items" DROP COLUMN "pricing_id",
ADD COLUMN     "pricing_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "pricing_observations" DROP COLUMN "pricing_id",
ADD COLUMN     "pricing_id" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "prices_id_key" ON "prices"("id");

-- AddForeignKey
ALTER TABLE "pricing_items" ADD CONSTRAINT "pricing_items_pricing_id_fkey" FOREIGN KEY ("pricing_id") REFERENCES "prices"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pricing_observations" ADD CONSTRAINT "pricing_observations_pricing_id_fkey" FOREIGN KEY ("pricing_id") REFERENCES "prices"("id") ON DELETE CASCADE ON UPDATE CASCADE;
