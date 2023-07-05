-- CreateEnum
CREATE TYPE "StageStatus" AS ENUM ('pending', 'progress', 'completed');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('EXT_CANDIDATE_EDU', 'EXT_ADMIN_EDU', 'EXT_USER_EDU', 'INT_CANDIDATE_EDU', 'INT_ADMIN_EDU', 'INT_USER_EDU');

-- CreateTable
CREATE TABLE "ContactUsEdu" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ContactUsEdu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContactUsJob" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ContactUsJob_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CandidateEdu" (
    "userId" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "stageId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CandidateEdu_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "CompanyEdu" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CompanyEdu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AccessEdu" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "stage" TEXT NOT NULL DEFAULT '1',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AccessEdu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StageEdu" (
    "id" TEXT NOT NULL,
    "candidateId" TEXT NOT NULL,
    "ActorId" TEXT NOT NULL,
    "stage" TEXT NOT NULL DEFAULT '1',
    "status" "StageStatus" NOT NULL DEFAULT 'pending',
    "message" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT,

    CONSTRAINT "StageEdu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "refresh_token_expires_in" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "bio" TEXT,
    "age" INTEGER,
    "email" TEXT,
    "password" TEXT,
    "phone" TEXT,
    "role" "Role" DEFAULT 'INT_CANDIDATE_EDU',
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "ContactUsEdu_phone_key" ON "ContactUsEdu"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "ContactUsJob_email_key" ON "ContactUsJob"("email");

-- CreateIndex
CREATE UNIQUE INDEX "ContactUsJob_phone_key" ON "ContactUsJob"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "CandidateEdu_userId_key" ON "CandidateEdu"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "CompanyEdu_ownerId_key" ON "CompanyEdu"("ownerId");

-- CreateIndex
CREATE UNIQUE INDEX "Account_userId_key" ON "Account"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_key" ON "User"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- AddForeignKey
ALTER TABLE "CandidateEdu" ADD CONSTRAINT "CandidateEdu_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CandidateEdu" ADD CONSTRAINT "CandidateEdu_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "CompanyEdu"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CandidateEdu" ADD CONSTRAINT "CandidateEdu_stageId_fkey" FOREIGN KEY ("stageId") REFERENCES "StageEdu"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyEdu" ADD CONSTRAINT "CompanyEdu_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AccessEdu" ADD CONSTRAINT "AccessEdu_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "CompanyEdu"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AccessEdu" ADD CONSTRAINT "AccessEdu_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StageEdu" ADD CONSTRAINT "StageEdu_ActorId_fkey" FOREIGN KEY ("ActorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StageEdu" ADD CONSTRAINT "StageEdu_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StageEdu" ADD CONSTRAINT "StageEdu_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
