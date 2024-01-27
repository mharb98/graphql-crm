import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateYasseens1706366710240 implements MigrationInterface {
    name = 'CreateYasseens1706366710240'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "yasseens" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_b3bb14faa048a9f6a8002823914" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "yasseens"`);
    }

}
