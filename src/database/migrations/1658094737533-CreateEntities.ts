import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateEntities1658094737533 implements MigrationInterface {
    name = 'CreateEntities1658094737533'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" BIGSERIAL NOT NULL, "firstName" character varying(50) NOT NULL, "lastName" character varying(50) NOT NULL, "email" character varying(100) NOT NULL, "password" character varying NOT NULL, "lastSeenAt" TIMESTAMP, "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."transactions_type_enum" AS ENUM('credit', 'debit')`);
        await queryRunner.query(`CREATE TYPE "public"."transactions_category_enum" AS ENUM('revenue', 'expense', 'grant', 'loss', 'loan', 'loanPayment', 'debt', 'debtPayment')`);
        await queryRunner.query(`CREATE TABLE "transactions" ("id" BIGSERIAL NOT NULL, "type" "public"."transactions_type_enum" NOT NULL DEFAULT 'credit', "category" "public"."transactions_category_enum" NOT NULL DEFAULT 'revenue', "amount" double precision NOT NULL, "reason" text, "date" TIMESTAMP NOT NULL, "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" bigint NOT NULL, CONSTRAINT "PK_a219afd8dd77ed80f5a862f1db9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD CONSTRAINT "FK_6bb58f2b6e30cb51a6504599f41" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transactions" DROP CONSTRAINT "FK_6bb58f2b6e30cb51a6504599f41"`);
        await queryRunner.query(`DROP TABLE "transactions"`);
        await queryRunner.query(`DROP TYPE "public"."transactions_category_enum"`);
        await queryRunner.query(`DROP TYPE "public"."transactions_type_enum"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
