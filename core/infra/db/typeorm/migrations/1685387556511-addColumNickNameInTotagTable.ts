import { MigrationInterface, QueryRunner } from "typeorm"

export class AddColumNickNameInTotagTable1685387556511 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "tags" ADD "nick_name" varchar(255) NULL`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tags" DROP COLUMN "nick_name"`);
    }

}
