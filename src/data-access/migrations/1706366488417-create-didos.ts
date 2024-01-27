import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateDidos1706366488417 implements MigrationInterface {
    name = 'CreateDidos1706366488417'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "didos" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_2173bebc535f03ba35ad7c0643b" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "didos"`);
    }

}
