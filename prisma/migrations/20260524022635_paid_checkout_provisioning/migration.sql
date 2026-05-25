-- DropForeignKey
ALTER TABLE "BillingOrder" DROP CONSTRAINT "BillingOrder_userId_fkey";

-- AlterTable
ALTER TABLE "BillingOrder" ADD COLUMN     "checkoutSessionId" TEXT,
ALTER COLUMN "userId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "BillingOrder" ADD CONSTRAINT "BillingOrder_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
