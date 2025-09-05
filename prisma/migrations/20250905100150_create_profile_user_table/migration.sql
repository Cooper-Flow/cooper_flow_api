/*
  Warnings:

  - The primary key for the `profile_permissions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `created_at` on the `profile_permissions` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `profile_permissions` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `profile_permissions` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "profile_permissions_id_key";

-- AlterTable
ALTER TABLE "profile_permissions" DROP CONSTRAINT "profile_permissions_pkey",
DROP COLUMN "created_at",
DROP COLUMN "id",
DROP COLUMN "updated_at",
ADD CONSTRAINT "profile_permissions_pkey" PRIMARY KEY ("profile_id");

-- CreateTable
CREATE TABLE "profile_users" (
    "profile_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "profile_users_pkey" PRIMARY KEY ("profile_id","user_id")
);

-- AddForeignKey
ALTER TABLE "profile_users" ADD CONSTRAINT "profile_users_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profile_users" ADD CONSTRAINT "profile_users_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
