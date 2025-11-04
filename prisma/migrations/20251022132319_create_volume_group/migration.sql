-- AlterTable
ALTER TABLE "products" ADD COLUMN     "color" VARCHAR(255);

-- AlterTable
ALTER TABLE "volumes" ADD COLUMN     "volume_group_id" TEXT;

-- CreateTable
CREATE TABLE "volume_groups" (
    "id" TEXT NOT NULL,
    "location_id" TEXT,

    CONSTRAINT "volume_groups_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "volume_groups_id_key" ON "volume_groups"("id");

-- AddForeignKey
ALTER TABLE "volumes" ADD CONSTRAINT "volumes_volume_group_id_fkey" FOREIGN KEY ("volume_group_id") REFERENCES "volume_groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "volume_groups" ADD CONSTRAINT "volume_groups_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "locations"("id") ON DELETE CASCADE ON UPDATE CASCADE;
