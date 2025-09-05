/*
  Warnings:

  - The primary key for the `profile_permissions` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "profile_permissions" DROP CONSTRAINT "profile_permissions_pkey",
ADD CONSTRAINT "profile_permissions_pkey" PRIMARY KEY ("profile_id", "permission");
