import { MigrationInterface, QueryRunner } from 'typeorm';

export class relationalFkTagsVehicles1684868840154
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE "tags" ADD CONSTRAINT "FK_tags_vehicle_id" FOREIGN KEY ("vehicle_id") REFERENCES "vehicles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE public.tags DROP CONSTRAINT "FK_tags_vehicle_id";
      `);
  }
}
