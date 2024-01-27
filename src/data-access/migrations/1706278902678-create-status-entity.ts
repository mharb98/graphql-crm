import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateStatusEntity1706278902678 implements MigrationInterface {
    name = 'CreateStatusEntity1706278902678'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "statuses" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying(255) NOT NULL, CONSTRAINT "PK_2fd3770acdb67736f1a3e3d5399" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "status_updates" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "comment" character varying(255) NOT NULL, "status_id" integer NOT NULL, "user_id" integer NOT NULL, CONSTRAINT "PK_a4dc636b9a35229ec5cee2b1dfb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "status_updates" ADD CONSTRAINT "FK_f77d8be069d977ac15070f54f82" FOREIGN KEY ("status_id") REFERENCES "statuses"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "status_updates" ADD CONSTRAINT "FK_e54cc71c1fbd342a50d948aa963" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "status_updates" DROP CONSTRAINT "FK_e54cc71c1fbd342a50d948aa963"`);
        await queryRunner.query(`ALTER TABLE "status_updates" DROP CONSTRAINT "FK_f77d8be069d977ac15070f54f82"`);
        await queryRunner.query(`DROP TABLE "status_updates"`);
        await queryRunner.query(`DROP TABLE "statuses"`);
    }

}
