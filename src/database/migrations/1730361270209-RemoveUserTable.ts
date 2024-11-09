import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveUserTable1730361270209 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "name" TO "ten"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user" RENAME COLUMN "ten" TO "name"
        `);
    }

}
