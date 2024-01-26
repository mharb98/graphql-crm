import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatePurchaseEntity1706271360487 implements MigrationInterface {
    name = 'CreatePurchaseEntity1706271360487'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "purchases" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "total_price" bigint NOT NULL, "taxes" bigint NOT NULL, "total_discount" bigint NOT NULL DEFAULT '0', "customer_id" integer NOT NULL, "sales_agent_id" integer NOT NULL, CONSTRAINT "PK_1d55032f37a34c6eceacbbca6b8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "purchases" ADD CONSTRAINT "FK_6b126c5c1c05fc81e93fc8d427a" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "purchases" DROP CONSTRAINT "FK_6b126c5c1c05fc81e93fc8d427a"`);
        await queryRunner.query(`DROP TABLE "purchases"`);
    }

}
