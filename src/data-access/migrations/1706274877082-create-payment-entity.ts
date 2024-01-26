import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatePaymentEntity1706274877082 implements MigrationInterface {
  name = 'CreatePaymentEntity1706274877082';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "installments" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "amount" bigint NOT NULL, "due_date" date NOT NULL, "purchase_id" integer NOT NULL, CONSTRAINT "PK_c74e44aa06bdebef2af0a93da1b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "installments" ADD CONSTRAINT "FK_6955da417d01ccff8a3786a7858" FOREIGN KEY ("purchase_id") REFERENCES "purchases"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "installments" DROP CONSTRAINT "FK_6955da417d01ccff8a3786a7858"`,
    );
    await queryRunner.query(`DROP TABLE "installments"`);
  }
}
