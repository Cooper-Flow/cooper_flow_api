-- AlterTable
ALTER TABLE "enters" ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'closed';

-- AlterTable
ALTER TABLE "volumes" ADD COLUMN     "isStash" BOOLEAN NOT NULL DEFAULT false;
