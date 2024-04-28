-- CreateTable
CREATE TABLE "bulletin" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "loginId" TEXT,
    CONSTRAINT "bulletin_loginId_fkey" FOREIGN KEY ("loginId") REFERENCES "login" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
