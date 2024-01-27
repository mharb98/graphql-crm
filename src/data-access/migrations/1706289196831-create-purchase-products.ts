import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatePurchaseProducts1706289196831 implements MigrationInterface {
    name = 'CreatePurchaseProducts1706289196831'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "purchase_products" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "amount" bigint NOT NULL, "discount" bigint NOT NULL, "product_id" integer NOT NULL, "purchase_id" integer NOT NULL, CONSTRAINT "unique_constraint_purchase_id_product_id" UNIQUE ("product_id", "purchase_id"), CONSTRAINT "PK_834c2020dec2ffd63f430e97de7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "purchase_products" ADD CONSTRAINT "FK_441edaa940541a7b90661dec0ba" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "purchase_products" ADD CONSTRAINT "FK_0a665370df4167bb946cf4b19eb" FOREIGN KEY ("purchase_id") REFERENCES "purchases"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "purchase_products" DROP CONSTRAINT "FK_0a665370df4167bb946cf4b19eb"`);
        await queryRunner.query(`ALTER TABLE "purchase_products" DROP CONSTRAINT "FK_441edaa940541a7b90661dec0ba"`);
        await queryRunner.query(`DROP TABLE "purchase_products"`);
    }

}
