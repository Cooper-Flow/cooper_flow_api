-- AlterTable
ALTER TABLE "volume_exits" ADD COLUMN     "exitV2Id" INTEGER;

-- AlterTable
ALTER TABLE "volumes" ADD COLUMN     "exitV2Id" INTEGER;

-- CreateTable
CREATE TABLE "boxe_enters" (
    "id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "product_name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "amount" INTEGER NOT NULL DEFAULT 0,
    "entry_id" INTEGER NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "material_id" TEXT,
    "location_id" TEXT,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "boxe_enters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "boxes" (
    "id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "product_name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "amount" INTEGER NOT NULL DEFAULT 0,
    "material_id" TEXT,
    "location_id" TEXT,
    "exit_id" INTEGER,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "boxes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "box_fragments" (
    "id" TEXT NOT NULL,
    "box_id" TEXT NOT NULL,
    "entry_id" INTEGER NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "box_fragments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "entry_v2" (
    "id" SERIAL NOT NULL,
    "creator_id" TEXT NOT NULL,
    "producer_id" TEXT NOT NULL,
    "field" TEXT,
    "batch" TEXT,
    "entry_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "observation" TEXT,
    "status" TEXT NOT NULL DEFAULT 'closed',
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL,

    CONSTRAINT "entry_v2_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "exit_v2" (
    "id" SERIAL NOT NULL,
    "exit_type" TEXT NOT NULL,
    "person_id" TEXT,
    "user_id" TEXT NOT NULL,
    "exit_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "observation" TEXT,
    "status" TEXT NOT NULL,
    "invoice" TEXT,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL,

    CONSTRAINT "exit_v2_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "boxe_enters_id_key" ON "boxe_enters"("id");

-- CreateIndex
CREATE UNIQUE INDEX "boxes_id_key" ON "boxes"("id");

-- CreateIndex
CREATE UNIQUE INDEX "box_fragments_id_key" ON "box_fragments"("id");

-- CreateIndex
CREATE UNIQUE INDEX "entry_v2_id_key" ON "entry_v2"("id");

-- CreateIndex
CREATE UNIQUE INDEX "exit_v2_id_key" ON "exit_v2"("id");

-- AddForeignKey
ALTER TABLE "volumes" ADD CONSTRAINT "volumes_exitV2Id_fkey" FOREIGN KEY ("exitV2Id") REFERENCES "exit_v2"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "volume_exits" ADD CONSTRAINT "volume_exits_exitV2Id_fkey" FOREIGN KEY ("exitV2Id") REFERENCES "exit_v2"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "boxe_enters" ADD CONSTRAINT "boxe_enters_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "boxe_enters" ADD CONSTRAINT "boxe_enters_entry_id_fkey" FOREIGN KEY ("entry_id") REFERENCES "enters"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "boxe_enters" ADD CONSTRAINT "boxe_enters_material_id_fkey" FOREIGN KEY ("material_id") REFERENCES "materials"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "boxe_enters" ADD CONSTRAINT "boxe_enters_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "locations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "boxes" ADD CONSTRAINT "boxes_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "boxes" ADD CONSTRAINT "boxes_material_id_fkey" FOREIGN KEY ("material_id") REFERENCES "materials"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "boxes" ADD CONSTRAINT "boxes_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "locations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "boxes" ADD CONSTRAINT "boxes_exit_id_fkey" FOREIGN KEY ("exit_id") REFERENCES "exits"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "box_fragments" ADD CONSTRAINT "box_fragments_box_id_fkey" FOREIGN KEY ("box_id") REFERENCES "boxes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "box_fragments" ADD CONSTRAINT "box_fragments_entry_id_fkey" FOREIGN KEY ("entry_id") REFERENCES "enters"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "entry_v2" ADD CONSTRAINT "entry_v2_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "entry_v2" ADD CONSTRAINT "entry_v2_producer_id_fkey" FOREIGN KEY ("producer_id") REFERENCES "producers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exit_v2" ADD CONSTRAINT "exit_v2_person_id_fkey" FOREIGN KEY ("person_id") REFERENCES "persons"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exit_v2" ADD CONSTRAINT "exit_v2_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
