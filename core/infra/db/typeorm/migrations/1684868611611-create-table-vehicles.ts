import { MigrationInterface, QueryRunner } from 'typeorm';

export class createTableVehicles1684868611611 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE public.vehicles (
            "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
            "plate" varchar(7) NOT NULL,
            "axles" int4 NOT NULL,
            "observation" varchar(255) NULL,
            "user_id" uuid NOT NULL,
            "created_at" TIMESTAMP WITH TIME ZONE DEFAULT now(),
            "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(),
            "deleted_at" timestamp NULL,
            CONSTRAINT "PK_vehicle_id" PRIMARY KEY (id)
        );
        
        ALTER TABLE "vehicles" ADD CONSTRAINT "FK_vehicle_user_id" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DROP TABLE public.vehicles;
      `);
  }
}
