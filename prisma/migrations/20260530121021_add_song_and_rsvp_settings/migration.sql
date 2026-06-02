-- AlterTable
ALTER TABLE "Invitation" ADD COLUMN     "confirmMessage" TEXT,
ADD COLUMN     "isRsvpEnabled" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "maxGuests" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "musicTitle" TEXT,
ADD COLUMN     "rsvpDeadline" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "Song" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "artist" TEXT NOT NULL,
    "album" TEXT,
    "genre" TEXT,
    "duration" INTEGER,
    "coverUrl" TEXT,
    "audioUrl" TEXT NOT NULL,
    "provider" TEXT NOT NULL DEFAULT 'upload',
    "externalId" TEXT,
    "isPremium" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "usageCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Song_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Song_audioUrl_key" ON "Song"("audioUrl");
