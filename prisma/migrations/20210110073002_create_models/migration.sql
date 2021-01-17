-- CreateTable
CREATE TABLE "MunicipalAgency" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "stringId" TEXT NOT NULL,
    "url" TEXT,
    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Filer" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "committeeType" TEXT NOT NULL,
    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ScheduleAContribution" (
    "id" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "transactionId" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "amount" REAL NOT NULL,
    "description" TEXT NOT NULL,
    "contributorType" TEXT NOT NULL,
    "contributorLastName" TEXT NOT NULL,
    "contributorFirstName" TEXT NOT NULL,
    "contributorAddress1" TEXT,
    "contributorAddress2" TEXT,
    "contributorCity" TEXT,
    "contributorState" TEXT,
    "contributorZip" TEXT,
    "contributorOccupation" TEXT,
    "contributorEmployer" TEXT,
    "contributorSelfEmployed" BOOLEAN,
    "contributorCommitteeId" TEXT,
    "reportNumber" INTEGER,
    "reportDate" TEXT,
    "reportFromDate" TEXT,
    "reportThruDate" TEXT,
    "filerId" TEXT NOT NULL,
    "agencyId" TEXT NOT NULL,

    FOREIGN KEY ("filerId") REFERENCES "Filer"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("agencyId") REFERENCES "MunicipalAgency"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ScheduleCContribution" (
    "id" TEXT NOT NULL,
    "transactionId" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "amount" REAL NOT NULL,
    "description" TEXT NOT NULL,
    "contributorType" TEXT NOT NULL,
    "contributorLastName" TEXT NOT NULL,
    "contributorFirstName" TEXT NOT NULL,
    "contributorAddress1" TEXT,
    "contributorAddress2" TEXT,
    "contributorCity" TEXT,
    "contributorState" TEXT,
    "contributorZip" TEXT,
    "contributorOccupation" TEXT,
    "contributorEmployer" TEXT,
    "contributorSelfEmployed" BOOLEAN,
    "contributorCommitteeId" TEXT,
    "reportNumber" INTEGER,
    "reportDate" TEXT,
    "reportFromDate" TEXT,
    "reportThruDate" TEXT,
    "filerId" TEXT NOT NULL,
    "agencyId" TEXT NOT NULL,

    FOREIGN KEY ("filerId") REFERENCES "Filer"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("agencyId") REFERENCES "MunicipalAgency"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ScheduleEPayment" (
    "id" TEXT NOT NULL,
    "transactionId" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "amount" REAL NOT NULL,
    "description" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "payeeType" TEXT NOT NULL,
    "payeeLastName" TEXT NOT NULL,
    "payeeFirstName" TEXT,
    "payeeAddress1" TEXT,
    "payeeAddress2" TEXT,
    "payeeCity" TEXT,
    "payeeState" TEXT,
    "payeeZip" TEXT,
    "payeeCommitteeId" TEXT,
    "reportNumber" INTEGER,
    "reportDate" TEXT,
    "reportFromDate" TEXT,
    "reportThruDate" TEXT,
    "filerId" TEXT NOT NULL,
    "agencyId" TEXT NOT NULL,

    FOREIGN KEY ("filerId") REFERENCES "Filer"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("agencyId") REFERENCES "MunicipalAgency"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_FilerToMunicipalAgency" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    FOREIGN KEY ("A") REFERENCES "Filer"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("B") REFERENCES "MunicipalAgency"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "ScheduleCContribution.transactionId_unique" ON "ScheduleCContribution"("transactionId");

-- CreateIndex
CREATE UNIQUE INDEX "ScheduleEPayment.transactionId_unique" ON "ScheduleEPayment"("transactionId");

-- CreateIndex
CREATE UNIQUE INDEX "_FilerToMunicipalAgency_AB_unique" ON "_FilerToMunicipalAgency"("A", "B");

-- CreateIndex
CREATE INDEX "_FilerToMunicipalAgency_B_index" ON "_FilerToMunicipalAgency"("B");
