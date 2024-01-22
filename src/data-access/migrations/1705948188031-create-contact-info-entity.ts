import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateContactInfoEntity1705948188031
  implements MigrationInterface
{
  name = 'CreateContactInfoEntity1705948188031';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "contact_info" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "value" character varying(255) NOT NULL, "customer_id" integer NOT NULL, CONSTRAINT "PK_65b98fa4ffb26dceb9192f5d496" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "contact_info" ADD CONSTRAINT "FK_319291f37dac390a597765cf976" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "contact_info" DROP CONSTRAINT "FK_319291f37dac390a597765cf976"`,
    );
    await queryRunner.query(`DROP TABLE "contact_info"`);
  }
}
