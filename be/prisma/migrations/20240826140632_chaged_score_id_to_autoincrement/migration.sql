-- AlterTable
CREATE SEQUENCE tui_comment_score_id_seq;
ALTER TABLE "tui_comment" ALTER COLUMN "score_id" SET DEFAULT nextval('tui_comment_score_id_seq');
ALTER SEQUENCE tui_comment_score_id_seq OWNED BY "tui_comment"."score_id";
