import { MigrationInterface, QueryRunner } from "typeorm";

export class AddSalesAgentToPurchase1708174979535 implements MigrationInterface {
    name = 'AddSalesAgentToPurchase1708174979535'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "purchases" ADD CONSTRAINT "FK_4a361182719da966b401fa606a2" FOREIGN KEY ("sales_agent_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "purchases" DROP CONSTRAINT "FK_4a361182719da966b401fa606a2"`);
    }

}
