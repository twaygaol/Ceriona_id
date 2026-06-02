-- DropForeignKey
ALTER TABLE "Gallery" DROP CONSTRAINT "Gallery_invitationId_fkey";

-- AddForeignKey
ALTER TABLE "Gallery" ADD CONSTRAINT "Gallery_invitationId_fkey" FOREIGN KEY ("invitationId") REFERENCES "Invitation"("id") ON DELETE CASCADE ON UPDATE CASCADE;
