-- CreateTable
CREATE TABLE "public"."Kullanıcı" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Kullanıcı_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Blog" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,

    CONSTRAINT "Blog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Comment" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "blogId" TEXT NOT NULL,
    "KullanıcıId" TEXT NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Like" (
    "id" TEXT NOT NULL,
    "blogId" TEXT NOT NULL,
    "KullanıcıId" TEXT NOT NULL,

    CONSTRAINT "Like_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Kullanıcı_username_key" ON "public"."Kullanıcı"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Kullanıcı_email_key" ON "public"."Kullanıcı"("email");

-- AddForeignKey
ALTER TABLE "public"."Blog" ADD CONSTRAINT "Blog_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "public"."Kullanıcı"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Comment" ADD CONSTRAINT "Comment_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES "public"."Blog"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Comment" ADD CONSTRAINT "Comment_KullanıcıId_fkey" FOREIGN KEY ("KullanıcıId") REFERENCES "public"."Kullanıcı"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Like" ADD CONSTRAINT "Like_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES "public"."Blog"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Like" ADD CONSTRAINT "Like_KullanıcıId_fkey" FOREIGN KEY ("KullanıcıId") REFERENCES "public"."Kullanıcı"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
