import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateProductEntity1705948872445 implements MigrationInterface {
    name = 'CreateProductEntity1705948872445'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "products" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying(255) NOT NULL, "description" character varying(255) NOT NULL, "price" bigint NOT NULL, "stock" bigint NOT NULL DEFAULT '0', "rating" bigint NOT NULL DEFAULT '0', CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "products"`);
    }

}
