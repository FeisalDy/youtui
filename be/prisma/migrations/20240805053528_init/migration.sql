-- CreateTable
CREATE TABLE "books" (
    "id" INTEGER NOT NULL,
    "url" VARCHAR(255),
    "name" VARCHAR(255),
    "en_name" VARCHAR(255),
    "author" VARCHAR(255),
    "category" VARCHAR(255),
    "length" INTEGER,
    "rating_count" INTEGER,
    "rating_avg" DOUBLE PRECISION,
    "update_date" DATE,
    "cover_url" VARCHAR(255),
    "description" TEXT,

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

-- CreateTable
CREATE TABLE "en_books" (
    "id" INTEGER NOT NULL,
    "url" VARCHAR(255),
    "name" VARCHAR(255),
    "cn_name" VARCHAR(255),
    "author" VARCHAR(255),
    "category" VARCHAR(255),
    "length" INTEGER,
    "rating_count" INTEGER,
    "rating_avg" DOUBLE PRECISION,
    "update_date" DATE,
    "cover_url" VARCHAR(255),
    "description" TEXT,

    CONSTRAINT "en_books_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "en_comments" (
    "id" INTEGER NOT NULL,
    "comment_id" VARCHAR(255),
    "username" VARCHAR(255),
    "user_id" INTEGER,
    "book_id" INTEGER,
    "rate" INTEGER,
    "message" TEXT,
    "starnum" INTEGER,

    CONSTRAINT "en_comments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tui_json" (
    "id" SERIAL NOT NULL,
    "data" JSONB NOT NULL,

    CONSTRAINT "tui_json_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tui_booklist" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "data" JSONB NOT NULL,

    CONSTRAINT "tui_booklist_pkey" PRIMARY KEY ("id")
);
