import { MigrationInterface, QueryRunner } from 'typeorm';

export class createTableVehicleCategory1685552277146
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`

        CREATE TABLE public."vehicle_category" (
            "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
            "category_code_gp" varchar NOT NULL,
            "name" varchar(255) NOT NULL,
            "axles" int4 NOT NULL DEFAULT 0,
            CONSTRAINT "PK_vehicle_category_id" PRIMARY KEY (id),
            CONSTRAINT "UQ_40a859fe1c7320f487fcfecee35" UNIQUE ("category_code_gp")
        );
            INSERT INTO "public"."vehicle_category" ("category_code_gp", "name","axles") VALUES ('101', '2 Eixos (Rod.Simple)',2);
            INSERT INTO "public"."vehicle_category" ("category_code_gp", "name","axles") VALUES ('102', '3 Eixos (Rod.Simple)',3);
            INSERT INTO "public"."vehicle_category" ("category_code_gp", "name","axles") VALUES ('103', '4 Eixos (Rod.Simple)',4);
            INSERT INTO "public"."vehicle_category" ("category_code_gp", "name","axles") VALUES ('305', '2 Eixos (Rod.Dupla)',2);
            INSERT INTO "public"."vehicle_category" ("category_code_gp", "name","axles") VALUES ('306', '3 Eixos (Rod.Dupla)',3);
            INSERT INTO "public"."vehicle_category" ("category_code_gp", "name","axles") VALUES ('307', '4 Eixos (Rod.Dupla)',4);
            INSERT INTO "public"."vehicle_category" ("category_code_gp", "name","axles") VALUES ('308', '5 Eixos (Rod.Dupla)',5);
            INSERT INTO "public"."vehicle_category" ("category_code_gp", "name","axles") VALUES ('309', '6 Eixos (Rod.Dupla)',6);
            INSERT INTO "public"."vehicle_category" ("category_code_gp", "name","axles") VALUES ('313', '7 Eixos (Rod.Dupla)',7);
            INSERT INTO "public"."vehicle_category" ("category_code_gp", "name","axles") VALUES ('314', '8 Eixos (Rod.Dupla)',8);
            INSERT INTO "public"."vehicle_category" ("category_code_gp", "name","axles") VALUES ('315', '9 Eixos (Rod.Dupla)',9);
            INSERT INTO "public"."vehicle_category" ("category_code_gp", "name","axles") VALUES ('316', '10 Eixos (Rod.Dupla)',10);
           
            ALTER TABLE "vehicles" ADD "vehicle_category_id" UUID NOT NULL;
            ALTER TABLE "vehicles" ADD CONSTRAINT "FK_vehicle_category_id" FOREIGN KEY ("vehicle_category_id") REFERENCES "vehicle_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
        
            ALTER TABLE "vehicles" DROP COLUMN "axles";
            `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    DROP TABLE "public"."vehicle_category";
    ALTER TABLE "vehicles" DROP COLUMN "vehicle_category_id";`);
  }
}
