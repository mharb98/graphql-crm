import { MigrationInterface, QueryRunner } from "typeorm";

export class PurchaseItemCompositeKey1706275218588 implements MigrationInterface {
    name = 'PurchaseItemCompositeKey1706275218588'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "purchase_items" ADD "purchase_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "purchase_items" DROP CONSTRAINT "FK_a8b9a50f75d352052fc2339dc43"`);
        await queryRunner.query(`ALTER TABLE "purchase_items" ALTER COLUMN "customer_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "purchase_items" ADD CONSTRAINT "unique_constraint_purchase_id_item_id" UNIQUE ("item_id", "purchase_id")`);
        await queryRunner.query(`ALTER TABLE "purchase_items" ADD CONSTRAINT "FK_a8b9a50f75d352052fc2339dc43" FOREIGN KEY ("customer_id") REFERENCES "purchases"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "purchase_items" DROP CONSTRAINT "FK_a8b9a50f75d352052fc2339dc43"`);
        await queryRunner.query(`ALTER TABLE "purchase_items" DROP CONSTRAINT "unique_constraint_purchase_id_item_id"`);
        await queryRunner.query(`ALTER TABLE "purchase_items" ALTER COLUMN "customer_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "purchase_items" ADD CONSTRAINT "FK_a8b9a50f75d352052fc2339dc43" FOREIGN KEY ("customer_id") REFERENCES "purchases"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "purchase_items" DROP COLUMN "purchase_id"`);
    }

}
