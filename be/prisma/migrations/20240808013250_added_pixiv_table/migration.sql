-- CreateTable
CREATE TABLE "pixiv_json" (
    "id" SERIAL NOT NULL,
    "data" JSONB NOT NULL,

    CONSTRAINT "pixiv_json_pkey" PRIMARY KEY ("id")
);
