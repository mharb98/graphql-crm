import { MigrationInterface, QueryRunner } from "typeorm";

export class FixForeignKeyName1706275331324 implements MigrationInterface {
    name = 'FixForeignKeyName1706275331324'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "purchase_items" DROP CONSTRAINT "FK_a8b9a50f75d352052fc2339dc43"`);
        await queryRunner.query(`ALTER TABLE "purchase_items" DROP COLUMN "customer_id"`);
        await queryRunner.query(`ALTER TABLE "purchase_items" ADD CONSTRAINT "FK_607211d59b13e705a673a999ab5" FOREIGN KEY ("purchase_id") REFERENCES "purchases"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "purchase_items" DROP CONSTRAINT "FK_607211d59b13e705a673a999ab5"`);
        await queryRunner.query(`ALTER TABLE "purchase_items" ADD "customer_id" integer`);
        await queryRunner.query(`ALTER TABLE "purchase_items" ADD CONSTRAINT "FK_a8b9a50f75d352052fc2339dc43" FOREIGN KEY ("customer_id") REFERENCES "purchases"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
