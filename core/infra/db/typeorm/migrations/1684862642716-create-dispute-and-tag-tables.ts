import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateDisputeAndTagTables1684862642716
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE public.dispute (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "disputed_transaction_chain_id" varchar NULL,
        "transaction_amount" numeric NULL,
        "dispute_id" varchar NULL,
        "open_date" timestamp NULL,
        "reference_identifier" varchar NULL,
        "request_date" timestamp NULL,
        "request_reason_code" numeric NULL,
        "request_reason" varchar NULL,
        "request_description" varchar NULL,
        "category" numeric NULL,
        "category_name" varchar NULL,
        "amount" numeric NULL,
        "process_status" varchar NULL,
        "result_status" varchar NULL,
        "merchant_information_date" timestamp NULL,
        "response_date" timestamp NULL,
        "response_description" varchar NULL,
        "refund_transaction_id" varchar NULL,
        "refund_amount" numeric NULL,
        "correction_transaction_id" varchar NULL,
        "correction_amount" numeric NULL,
        "tag_transaction_id" uuid NULL,
        CONSTRAINT "PK_e2f1f4741f2094ce789b0a7c5b3" PRIMARY KEY (id)
      );

      CREATE TABLE public."tag_transactions" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "transaction_id" varchar NULL,
        "transaction_origin_id" varchar NULL,
        "posting_date" timestamp NULL,
        "transaction_type_code" varchar NULL,
        "transaction_date" timestamp NULL,
        "credit_entry" bool NOT NULL DEFAULT false,
        "summary" varchar NULL,
        "payment_instrument_type" varchar NULL,
        "payment_instrument_type_code" numeric NULL,
        "payment_instrument" varchar NULL,
        "tag_id" uuid NULL,
        "amount" numeric(10, 2) NOT NULL,
        "created_at" TIMESTAMP WITH TIME ZONE DEFAULT now(),
        "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(),
        "deleted_at" timestamp NULL,
        CONSTRAINT "PK_091a05c048d714ec91a4850e63c" PRIMARY KEY (id)
      );

      CREATE TABLE public.tags (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "tag_number" varchar NOT NULL,
        "tag_status" numeric NOT NULL,
        "mother_box" varchar NULL,
        "child_box" varchar NULL,
        "requested_date" timestamp NULL,
        "sent_date" timestamp NULL,
        "observation" varchar NULL,
        "bond_date" timestamp NULL,
        "created_at" TIMESTAMP WITH TIME ZONE DEFAULT now(),
        "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(),
        "value" numeric NULL,
        "vehicle_id" uuid NULL,
        CONSTRAINT "PK_e7dc17249a1148a1970748eda99" PRIMARY KEY (id),
        CONSTRAINT "UQ_37acb61d31492f46d79a171be52" UNIQUE ("tag_number")
      );

      ALTER TABLE public.dispute ADD CONSTRAINT "FK_tag_transaction_dispute" FOREIGN KEY ("tag_transaction_id")
        REFERENCES public."tag_transactions"(id);

      ALTER TABLE public."tag_transactions" ADD CONSTRAINT "FK_tag_tag_transaction" FOREIGN KEY ("tag_id")
        REFERENCES public.tags(id);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE public.dispute DROP CONSTRAINT "FK_tag_transaction_dispute";
      ALTER TABLE public."tag_transactions" DROP CONSTRAINT "FK_tag_tag_transaction";

      DROP TABLE public.tags;
      DROP TABLE public."tag_transactions";
      DROP TABLE public.dispute;
    `);
  }
}
