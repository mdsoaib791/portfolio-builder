/*
  Warnings:

  - The primary key for the `Project` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Project` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Skill` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Skill` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `WorkExperience` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `WorkExperience` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Project" DROP CONSTRAINT "Project_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Project_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Skill" DROP CONSTRAINT "Skill_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Skill_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "WorkExperience" DROP CONSTRAINT "WorkExperience_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "WorkExperience_pkey" PRIMARY KEY ("id");
