/*
  Warnings:

  - Added the required column `sell_date` to the `Sell` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Sell" ADD COLUMN "created_at" TIMESTAMP(3);
UPDATE "Sell" SET "created_at" = now();
ALTER TABLE "Sell" ALTER COLUMN "created_at" SET NOT NULL;