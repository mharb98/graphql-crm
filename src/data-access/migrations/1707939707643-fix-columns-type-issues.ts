import { MigrationInterface, QueryRunner } from "typeorm";

export class FixColumnsTypeIssues1707939707643 implements MigrationInterface {
    name = 'FixColumnsTypeIssues1707939707643'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "products" ADD "price" numeric NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "stock"`);
        await queryRunner.query(`ALTER TABLE "products" ADD "stock" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "rating"`);
        await queryRunner.query(`ALTER TABLE "products" ADD "rating" numeric NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "purchase_products" DROP COLUMN "amount"`);
        await queryRunner.query(`ALTER TABLE "purchase_products" ADD "amount" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "purchase_products" DROP COLUMN "discount"`);
        await queryRunner.query(`ALTER TABLE "purchase_products" ADD "discount" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "installments" DROP COLUMN "amount"`);
        await queryRunner.query(`ALTER TABLE "installments" ADD "amount" numeric NOT NULL`);
        await queryRunner.query(`ALTER TABLE "purchases" DROP COLUMN "total_price"`);
        await queryRunner.query(`ALTER TABLE "purchases" ADD "total_price" numeric NOT NULL`);
        await queryRunner.query(`ALTER TABLE "purchases" DROP COLUMN "taxes"`);
        await queryRunner.query(`ALTER TABLE "purchases" ADD "taxes" numeric NOT NULL`);
        await queryRunner.query(`ALTER TABLE "purchases" DROP COLUMN "total_discount"`);
        await queryRunner.query(`ALTER TABLE "purchases" ADD "total_discount" numeric NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "purchases" DROP COLUMN "total_discount"`);
        await queryRunner.query(`ALTER TABLE "purchases" ADD "total_discount" bigint NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "purchases" DROP COLUMN "taxes"`);
        await queryRunner.query(`ALTER TABLE "purchases" ADD "taxes" bigint NOT NULL`);
        await queryRunner.query(`ALTER TABLE "purchases" DROP COLUMN "total_price"`);
        await queryRunner.query(`ALTER TABLE "purchases" ADD "total_price" bigint NOT NULL`);
        await queryRunner.query(`ALTER TABLE "installments" DROP COLUMN "amount"`);
        await queryRunner.query(`ALTER TABLE "installments" ADD "amount" bigint NOT NULL`);
        await queryRunner.query(`ALTER TABLE "purchase_products" DROP COLUMN "discount"`);
        await queryRunner.query(`ALTER TABLE "purchase_products" ADD "discount" bigint NOT NULL`);
        await queryRunner.query(`ALTER TABLE "purchase_products" DROP COLUMN "amount"`);
        await queryRunner.query(`ALTER TABLE "purchase_products" ADD "amount" bigint NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "rating"`);
        await queryRunner.query(`ALTER TABLE "products" ADD "rating" bigint NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "stock"`);
        await queryRunner.query(`ALTER TABLE "products" ADD "stock" bigint NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "products" ADD "price" bigint NOT NULL`);
    }

}
