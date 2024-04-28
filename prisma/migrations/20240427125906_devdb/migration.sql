/*
  Warnings:

  - The primary key for the `bulletin` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `bulletin` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to alter the column `loginId` on the `bulletin` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - The primary key for the `login` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `login` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_bulletin" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "loginId" INTEGER,
    CONSTRAINT "bulletin_loginId_fkey" FOREIGN KEY ("loginId") REFERENCES "login" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_bulletin" ("createdAt", "description", "id", "loginId", "title") SELECT "createdAt", "description", "id", "loginId", "title" FROM "bulletin";
DROP TABLE "bulletin";
ALTER TABLE "new_bulletin" RENAME TO "bulletin";
CREATE TABLE "new_login" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_login" ("createdDate", "email", "id", "name", "password") SELECT "createdDate", "email", "id", "name", "password" FROM "login";
DROP TABLE "login";
ALTER TABLE "new_login" RENAME TO "login";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
