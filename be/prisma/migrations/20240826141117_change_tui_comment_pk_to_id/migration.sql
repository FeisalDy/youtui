/*
  Warnings:

  - The primary key for the `tui_comment` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "tui_comment" DROP CONSTRAINT "tui_comment_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "score_id" DROP DEFAULT,
ADD CONSTRAINT "tui_comment_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "tui_comment_score_id_seq";
