import { MigrationInterface, QueryRunner } from 'typeorm';

export class createTablePlans1684255010246 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE public.plans (
            "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
            "plan_type" integer NULL,
            "load_type" integer NULL,
            CONSTRAINT "PK_plan_id" PRIMARY KEY (id)
          );`);

    queryRunner.query('ALTER TABLE "users" ADD "plan_id" uuid;');

    queryRunner.query(
      'ALTER TABLE "users" ADD CONSTRAINT "UQ_plan_id_unique" UNIQUE ("plan_id");',
    );

    queryRunner.query(
      'ALTER TABLE "users" ADD CONSTRAINT "FK_plan_id" FOREIGN KEY ("plan_id") REFERENCES "plans"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
