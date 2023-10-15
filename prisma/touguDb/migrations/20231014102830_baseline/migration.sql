-- CreateTable
CREATE TABLE "PortalUsers" (
    "id" SERIAL NOT NULL,
    "seqId" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "ref" TEXT NOT NULL,
    "realName" TEXT,
    "displayName" TEXT,
    "password" TEXT,
    "salt" TEXT NOT NULL,
    "mobile" TEXT DEFAULT '',
    "wechat" TEXT DEFAULT '',
    "qq" TEXT DEFAULT '',
    "lastLoginTime" TIMESTAMP(3),
    "vipTimeoutAt" TIMESTAMP(3),
    "lastLoginIP" TEXT,
    "isActivated" BOOLEAN NOT NULL DEFAULT false,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "PortalUsers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PortalUsers_seqId_key" ON "PortalUsers"("seqId");

-- CreateIndex
CREATE UNIQUE INDEX "PortalUsers_email_key" ON "PortalUsers"("email");

-- CreateIndex
CREATE UNIQUE INDEX "PortalUsers_salt_key" ON "PortalUsers"("salt");
