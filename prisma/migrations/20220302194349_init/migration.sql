-- CreateTable
CREATE TABLE "Metrics" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "timestamp" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "value" INTEGER NOT NULL
);
