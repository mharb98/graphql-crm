import { MigrationInterface, QueryRunner } from "typeorm";

export class FixPurchaseItemsRelations1706275026081 implements MigrationInterface {
    name = 'FixPurchaseItemsRelations1706275026081'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "purchase_items" ADD CONSTRAINT "FK_996b0c39d13837e6ddcd357cc9b" FOREIGN KEY ("item_id") REFERENCES "items"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "purchase_items" ADD CONSTRAINT "FK_a8b9a50f75d352052fc2339dc43" FOREIGN KEY ("customer_id") REFERENCES "purchases"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "purchase_items" DROP CONSTRAINT "FK_a8b9a50f75d352052fc2339dc43"`);
        await queryRunner.query(`ALTER TABLE "purchase_items" DROP CONSTRAINT "FK_996b0c39d13837e6ddcd357cc9b"`);
    }

}
