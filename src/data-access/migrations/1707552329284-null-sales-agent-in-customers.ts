import { MigrationInterface, QueryRunner } from 'typeorm';

export class NullSalesAgentInCustomers1707552329284
  implements MigrationInterface
{
  name = 'NullSalesAgentInCustomers1707552329284';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "customers" DROP CONSTRAINT "FK_41d6edfc2a362da6bc4da6e32ab"`,
    );
    await queryRunner.query(
      `ALTER TABLE "customers" ALTER COLUMN "sales_agent_id" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "customers" ADD CONSTRAINT "FK_41d6edfc2a362da6bc4da6e32ab" FOREIGN KEY ("sales_agent_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "customers" DROP CONSTRAINT "FK_41d6edfc2a362da6bc4da6e32ab"`,
    );
    await queryRunner.query(
      `ALTER TABLE "customers" ALTER COLUMN "sales_agent_id" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "customers" ADD CONSTRAINT "FK_41d6edfc2a362da6bc4da6e32ab" FOREIGN KEY ("sales_agent_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
