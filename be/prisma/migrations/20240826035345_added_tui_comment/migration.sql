-- CreateTable
CREATE TABLE "tui_comment" (
    "score_id" INTEGER NOT NULL,
    "book_id" INTEGER NOT NULL,
    "score" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "image" TEXT[],
    "like_number" INTEGER NOT NULL,
    "is_like" BOOLEAN NOT NULL,
    "reply_number" INTEGER NOT NULL,
    "coll_number" INTEGER NOT NULL,
    "is_coll" BOOLEAN NOT NULL,
    "create_time" TIMESTAMP(3) NOT NULL,
    "is_self" BOOLEAN NOT NULL,
    "user_id" INTEGER NOT NULL,
    "post_list" TEXT[],

    CONSTRAINT "tui_comment_pkey" PRIMARY KEY ("score_id")
);
