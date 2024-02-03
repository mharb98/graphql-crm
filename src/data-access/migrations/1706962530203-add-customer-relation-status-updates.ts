import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCustomerRelationStatusUpdates1706962530203 implements MigrationInterface {
    name = 'AddCustomerRelationStatusUpdates1706962530203'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "items" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying(255) NOT NULL, "price" bigint NOT NULL, "stock" bigint NOT NULL, CONSTRAINT "PK_ba5885359424c15ca6b9e79bcf6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "status_updates" ADD "customer_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "status_updates" ADD CONSTRAINT "FK_1005cf3e6a4439a94665b5e199f" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "status_updates" DROP CONSTRAINT "FK_1005cf3e6a4439a94665b5e199f"`);
        await queryRunner.query(`ALTER TABLE "status_updates" DROP COLUMN "customer_id"`);
        await queryRunner.query(`DROP TABLE "items"`);
    }

}
