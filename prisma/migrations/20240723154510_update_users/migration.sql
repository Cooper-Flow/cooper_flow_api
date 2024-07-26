/*
  Warnings:

  - A unique constraint covering the columns `[user]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "user" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "users_user_key" ON "users"("user");
