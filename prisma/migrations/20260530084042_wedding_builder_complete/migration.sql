-- AlterTable: Add new fields to Invitation
ALTER TABLE "Invitation" ADD COLUMN "groomFullName" TEXT;
ALTER TABLE "Invitation" ADD COLUMN "brideFullName" TEXT;
ALTER TABLE "Invitation" ADD COLUMN "groomNickname" TEXT;
ALTER TABLE "Invitation" ADD COLUMN "brideNickname" TEXT;
ALTER TABLE "Invitation" ADD COLUMN "groomPhoto" TEXT;
ALTER TABLE "Invitation" ADD COLUMN "bridePhoto" TEXT;
ALTER TABLE "Invitation" ADD COLUMN "couplePhoto" TEXT;
ALTER TABLE "Invitation" ADD COLUMN "groomDescription" TEXT;
ALTER TABLE "Invitation" ADD COLUMN "brideDescription" TEXT;
ALTER TABLE "Invitation" ADD COLUMN "groomInstagram" TEXT;
ALTER TABLE "Invitation" ADD COLUMN "brideInstagram" TEXT;
ALTER TABLE "Invitation" ADD COLUMN "groomFatherName" TEXT;
ALTER TABLE "Invitation" ADD COLUMN "groomMotherName" TEXT;
ALTER TABLE "Invitation" ADD COLUMN "brideFatherName" TEXT;
ALTER TABLE "Invitation" ADD COLUMN "brideMotherName" TEXT;
ALTER TABLE "Invitation" ADD COLUMN "coverTitle" TEXT;
ALTER TABLE "Invitation" ADD COLUMN "coverGuestName" TEXT;
ALTER TABLE "Invitation" ADD COLUMN "coverBackground" TEXT;
ALTER TABLE "Invitation" ADD COLUMN "coverPhoto" TEXT;
ALTER TABLE "Invitation" ADD COLUMN "coverQuote" TEXT;
ALTER TABLE "Invitation" ADD COLUMN "heroImage" TEXT;
ALTER TABLE "Invitation" ADD COLUMN "heroBackground" TEXT;
ALTER TABLE "Invitation" ADD COLUMN "heroQuote" TEXT;
ALTER TABLE "Invitation" ADD COLUMN "countdownTarget" TIMESTAMP(3);
ALTER TABLE "Invitation" ADD COLUMN "metaTitle" TEXT;
ALTER TABLE "Invitation" ADD COLUMN "metaDescription" TEXT;
ALTER TABLE "Invitation" ADD COLUMN "metaCoverImage" TEXT;
ALTER TABLE "Invitation" ADD COLUMN "selectedMusic" TEXT;
ALTER TABLE "Invitation" ADD COLUMN "themeCustomization" JSONB;

-- CreateTable: Event (multiple events per invitation)
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "time" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "address" TEXT,
    "googleMapsUrl" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "invitationId" TEXT NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable: LoveStory
CREATE TABLE "LoveStory" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "date" TEXT,
    "photo" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "invitationId" TEXT NOT NULL,

    CONSTRAINT "LoveStory_pkey" PRIMARY KEY ("id")
);

-- CreateTable: Moment
CREATE TABLE "Moment" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "photo" TEXT,
    "date" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "invitationId" TEXT NOT NULL,

    CONSTRAINT "Moment_pkey" PRIMARY KEY ("id")
);

-- CreateTable: Video
CREATE TABLE "Video" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'youtube',
    "url" TEXT NOT NULL,
    "title" TEXT,
    "thumbnail" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "invitationId" TEXT NOT NULL,

    CONSTRAINT "Video_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_invitationId_fkey" FOREIGN KEY ("invitationId") REFERENCES "Invitation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoveStory" ADD CONSTRAINT "LoveStory_invitationId_fkey" FOREIGN KEY ("invitationId") REFERENCES "Invitation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Moment" ADD CONSTRAINT "Moment_invitationId_fkey" FOREIGN KEY ("invitationId") REFERENCES "Invitation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Video" ADD CONSTRAINT "Video_invitationId_fkey" FOREIGN KEY ("invitationId") REFERENCES "Invitation"("id") ON DELETE CASCADE ON UPDATE CASCADE;
