-- CreateTable
CREATE TABLE "prices" (
    "id" TEXT NOT NULL,
    "creator_id" TEXT NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "prices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pricing_items" (
    "id" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "currency" TEXT NOT NULL DEFAULT 'R$',
    "volume_id" TEXT NOT NULL,
    "pricing_id" TEXT NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL,

    CONSTRAINT "pricing_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pricing_observations" (
    "id" TEXT NOT NULL,
    "description" VARCHAR(255),
    "creator_id" TEXT NOT NULL,
    "pricing_id" TEXT NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL,

    CONSTRAINT "pricing_observations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "prices_id_key" ON "prices"("id");

-- CreateIndex
CREATE UNIQUE INDEX "pricing_items_id_key" ON "pricing_items"("id");

-- CreateIndex
CREATE UNIQUE INDEX "pricing_observations_id_key" ON "pricing_observations"("id");

-- AddForeignKey
ALTER TABLE "prices" ADD CONSTRAINT "prices_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pricing_items" ADD CONSTRAINT "pricing_items_volume_id_fkey" FOREIGN KEY ("volume_id") REFERENCES "volumes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pricing_items" ADD CONSTRAINT "pricing_items_pricing_id_fkey" FOREIGN KEY ("pricing_id") REFERENCES "prices"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pricing_observations" ADD CONSTRAINT "pricing_observations_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pricing_observations" ADD CONSTRAINT "pricing_observations_pricing_id_fkey" FOREIGN KEY ("pricing_id") REFERENCES "prices"("id") ON DELETE CASCADE ON UPDATE CASCADE;
