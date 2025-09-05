-- CreateTable
CREATE TABLE "pricing_additionals" (
    "id" TEXT NOT NULL,
    "description" VARCHAR(255),
    "type" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "currency" TEXT NOT NULL DEFAULT 'R$',
    "pricing_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL,

    CONSTRAINT "pricing_additionals_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "pricing_additionals_id_key" ON "pricing_additionals"("id");

-- AddForeignKey
ALTER TABLE "pricing_additionals" ADD CONSTRAINT "pricing_additionals_pricing_id_fkey" FOREIGN KEY ("pricing_id") REFERENCES "prices"("id") ON DELETE CASCADE ON UPDATE CASCADE;
