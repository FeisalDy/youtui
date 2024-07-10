-- CreateTable
CREATE TABLE "books" (
    "id" INTEGER NOT NULL,
    "url" VARCHAR(255),
    "name" VARCHAR(255),
    "author" VARCHAR(255),
    "category" VARCHAR(255),
    "length" INTEGER,
    "rating_count" INTEGER,
    "rating_avg" DOUBLE PRECISION,
    "update_date" DATE,

    CONSTRAINT "books_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comments" (
    "id" INTEGER NOT NULL,
    "comment_id" VARCHAR(255),
    "username" VARCHAR(255),
    "user_id" INTEGER,
    "book_id" INTEGER,
    "rate" INTEGER,
    "message" TEXT,
    "starnum" INTEGER,

    CONSTRAINT "comments_pkey" PRIMARY KEY ("id")
);

