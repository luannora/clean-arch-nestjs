import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserAndTagRelation1685369168582 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "tags" ADD "user_id" uuid NULL`
        );
        await queryRunner.query(
            `ALTER TABLE "tags" ADD CONSTRAINT "FK_tags_user_user_id" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "tags" DROP CONSTRAINT "FK_tags_user_user_id"`
        );
        await queryRunner.query(`ALTER TABLE "tags" DROP COLUMN "user_id"`);
    }
}
