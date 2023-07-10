import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCreditCardRelation1686076541468 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "credit_cards" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "card_number" varchar NOT NULL,
        "card_due_date" timestamp NOT NULL,
        "card_ccv" integer,
        "card_owner_name" varchar,
        "card_owner_document" varchar,
        "card_owner_born_date" timestamp,
        "nick_name" varchar,
        "source" varchar,
        "external_ref" varchar NOT NULL,
        "deleted_at" timestamptz,
        "user_id" uuid,
        CONSTRAINT "PK_credit_cards" PRIMARY KEY ("id")
      )
    `);

    await queryRunner.query(`
      ALTER TABLE "credit_cards"
      ADD CONSTRAINT "FK_credit_cards_users"
      FOREIGN KEY ("user_id")
      REFERENCES "users"("id")
      ON DELETE CASCADE
      ON UPDATE CASCADE
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "credit_cards"
      DROP CONSTRAINT "FK_credit_cards_users"
    `);

    await queryRunner.query(`DROP TABLE "credit_cards"`);
  }
}
