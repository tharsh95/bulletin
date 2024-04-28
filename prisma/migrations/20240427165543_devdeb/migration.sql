/*
  Warnings:

  - Added the required column `image` to the `bulletin` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_bulletin" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" BLOB NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "loginId" INTEGER,
    CONSTRAINT "bulletin_loginId_fkey" FOREIGN KEY ("loginId") REFERENCES "login" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_bulletin" ("createdAt", "description", "id", "loginId", "title") SELECT "createdAt", "description", "id", "loginId", "title" FROM "bulletin";
DROP TABLE "bulletin";
ALTER TABLE "new_bulletin" RENAME TO "bulletin";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
