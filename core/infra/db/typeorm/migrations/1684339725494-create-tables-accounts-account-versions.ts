import { MigrationInterface, QueryRunner } from 'typeorm';

export class createTablesAccountsAccountVersions1684339725494
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE public.accounts (
            "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
            balance numeric NOT NULL DEFAULT '0'::numeric,
            locked numeric NOT NULL DEFAULT '0'::numeric,
            available numeric NOT NULL DEFAULT '0'::numeric,
            "created_at" TIMESTAMP WITH TIME ZONE DEFAULT now(),
            "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(),
            CONSTRAINT "PK_account_id" PRIMARY KEY (id)
        );`);

    await queryRunner.query(`CREATE TABLE public.account_versions (
            "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
            balance numeric NOT NULL DEFAULT '0'::numeric,
            locked numeric NOT NULL DEFAULT '0'::numeric,
            available numeric NOT NULL DEFAULT '0'::numeric,
            move_type varchar(10) NULL,
            table_name varchar(255) NULL,
            id_table uuid NULL,
            "created_at" TIMESTAMP WITH TIME ZONE DEFAULT now(),
            "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(),
            account_id uuid NULL,
            CONSTRAINT "PK_account_version_id" PRIMARY KEY (id)
        );`);

    await queryRunner.query(`ALTER TABLE ONLY public.account_versions
        ADD CONSTRAINT "FK_accounts_account_versions" FOREIGN KEY ("account_id") REFERENCES public.accounts(id);`);

    queryRunner.query('ALTER TABLE "users" ADD "account_id" uuid;');

    queryRunner.query(
      'ALTER TABLE "users" ADD CONSTRAINT "UQ_account_id_unique" UNIQUE ("account_id");',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
