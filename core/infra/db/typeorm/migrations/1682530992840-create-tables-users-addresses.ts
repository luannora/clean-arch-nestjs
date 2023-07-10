import { MigrationInterface, QueryRunner } from 'typeorm';

export class createTableAddressUsers1682530992840
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`set timezone="America/Sao_Paulo";`);

    await queryRunner.query(`CREATE TABLE public.addresses (
      "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
      "address_name" character varying(255) NULL,
      "address_zipcode" character varying(8) NULL,
      "address_number" character varying(20) NULL,
      "address_complement" character varying(255) NULL,
      "federal_state" character varying(10) NULL,
      "city" character varying(255), 
      "district" character varying(255), 
      CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY (id)
    );`);

    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(),
      "name" character varying(255) NOT NULL,
      "fantasy_name" character varying(255), 
      "email" character varying(255) NOT NULL,
      "born_date" date NOT NULL,
      "celphone" character varying(55),
      "telephone" character varying(55),
      "document" character varying(14), 
      "document_type" character varying(2),
      "address_id" uuid,
      "created_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), 
      "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), 
      "password" character varying(255), 
      "status" character varying(55) NOT NULL, 
      "role" character varying(55) NOT NULL,
      "code" character varying(255), 
      "code_expiration_date" date,
      "update_temporary_pass" TIMESTAMP WITH TIME ZONE, 
      CONSTRAINT "UQ_c5f78ad8f82e492c25d07f047a5" UNIQUE ("code"), 
      CONSTRAINT "PK_a95e949168be7b7ece1a2382fed" PRIMARY KEY ("id"),
      CONSTRAINT "FK_7f7d27c11048c3f183e12808ba2" FOREIGN KEY ("address_id") REFERENCES "addresses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
