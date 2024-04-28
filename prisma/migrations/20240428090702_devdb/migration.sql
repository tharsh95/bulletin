-- CreateTable
CREATE TABLE "login" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "bulletin" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "loginId" INTEGER,
    CONSTRAINT "bulletin_loginId_fkey" FOREIGN KEY ("loginId") REFERENCES "login" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
