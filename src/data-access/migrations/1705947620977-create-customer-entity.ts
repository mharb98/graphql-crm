import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCustomerEntity1705947620977 implements MigrationInterface {
  name = 'CreateCustomerEntity1705947620977';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "customers" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "first_name" character varying(255) NOT NULL, "last_name" character varying(255) NOT NULL, "salesAgentId" integer NOT NULL, "sales_agent_id" integer NOT NULL, CONSTRAINT "PK_133ec679a801fab5e070f73d3ea" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "customers" ADD CONSTRAINT "FK_41d6edfc2a362da6bc4da6e32ab" FOREIGN KEY ("sales_agent_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "customers" DROP CONSTRAINT "FK_41d6edfc2a362da6bc4da6e32ab"`,
    );
    await queryRunner.query(`DROP TABLE "customers"`);
  }
}
