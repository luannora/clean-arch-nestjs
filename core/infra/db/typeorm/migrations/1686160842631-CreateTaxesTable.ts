import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTaxesTable1686160842631 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE taxes (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        fee_percent NUMERIC(5, 2) NOT NULL DEFAULT 0,
        fee_fixed NUMERIC(10, 2) NOT NULL DEFAULT 0,
        start_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
        end_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
        active BOOLEAN NOT NULL DEFAULT TRUE
      );
    `);

    await queryRunner.query(`
      INSERT INTO taxes (fee_percent, fee_fixed, start_at, end_at, active)
      VALUES (0, 0, now(), now(), true);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE IF EXISTS taxes;');
  }
}
