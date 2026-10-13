-- CreateEnum
CREATE TYPE "ReceivableStatus" AS ENUM ('OPEN', 'PARTIALLY_PAID', 'PAID', 'OVERDUE', 'CANCELLED');

-- CreateTable
CREATE TABLE "receivables" (
    "id" TEXT NOT NULL,
    "transactionId" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "amountDue" DECIMAL(10,2) NOT NULL,
    "dueDate" TIMESTAMP(6) NOT NULL,
    "status" "ReceivableStatus" NOT NULL DEFAULT 'OPEN',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "receivables_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "receivables_transactionId_key" ON "receivables"("transactionId");

-- CreateIndex
CREATE INDEX "receivables_customerId_status_idx" ON "receivables"("customerId", "status");

-- CreateIndex
CREATE INDEX "receivables_dueDate_status_idx" ON "receivables"("dueDate", "status");

-- CreateIndex
CREATE INDEX "receivables_transactionId_status_idx" ON "receivables"("transactionId", "status");

-- AddForeignKey
ALTER TABLE "receivables" ADD CONSTRAINT "receivables_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "transactions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "receivables" ADD CONSTRAINT "receivables_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
