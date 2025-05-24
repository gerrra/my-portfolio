-- CreateTable
CREATE TABLE "LogEntry" (
    "id" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "details" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LogEntry_pkey" PRIMARY KEY ("id")
);
