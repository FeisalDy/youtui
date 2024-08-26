/*
  Warnings:

  - Added the required column `user` to the `tui_comment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tui_comment" ADD COLUMN     "user" JSONB NOT NULL;
