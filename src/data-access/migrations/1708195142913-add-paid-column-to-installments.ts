import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPaidColumnToInstallments1708195142913 implements MigrationInterface {
    name = 'AddPaidColumnToInstallments1708195142913'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "installments" ADD "paid" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "installments" DROP COLUMN "paid"`);
    }

}
