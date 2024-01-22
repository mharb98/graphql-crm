import { MigrationInterface, QueryRunner } from "typeorm";

export class ModifyCustomerEntity1705947718152 implements MigrationInterface {
    name = 'ModifyCustomerEntity1705947718152'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customers" DROP COLUMN "salesAgentId"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customers" ADD "salesAgentId" integer NOT NULL`);
    }

}
