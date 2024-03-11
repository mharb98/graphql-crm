import { MigrationInterface, QueryRunner } from "typeorm";

export class CustomerCascadeProperties1710187325462 implements MigrationInterface {
    name = 'CustomerCascadeProperties1710187325462'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contact_info" DROP CONSTRAINT "FK_319291f37dac390a597765cf976"`);
        await queryRunner.query(`ALTER TABLE "status_updates" DROP CONSTRAINT "FK_1005cf3e6a4439a94665b5e199f"`);
        await queryRunner.query(`ALTER TABLE "contact_info" ADD CONSTRAINT "FK_319291f37dac390a597765cf976" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "status_updates" ADD CONSTRAINT "FK_1005cf3e6a4439a94665b5e199f" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "status_updates" DROP CONSTRAINT "FK_1005cf3e6a4439a94665b5e199f"`);
        await queryRunner.query(`ALTER TABLE "contact_info" DROP CONSTRAINT "FK_319291f37dac390a597765cf976"`);
        await queryRunner.query(`ALTER TABLE "status_updates" ADD CONSTRAINT "FK_1005cf3e6a4439a94665b5e199f" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "contact_info" ADD CONSTRAINT "FK_319291f37dac390a597765cf976" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
