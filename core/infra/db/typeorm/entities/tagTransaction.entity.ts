import { ITagTransaction } from '@domain/tags/entities/tagTransaction.entity';
import { EntitySchema } from 'typeorm';

export const TagTransactionSchema = new EntitySchema<ITagTransaction>({
  name: 'tag_transactions',
  columns: {
    id: {
      type: 'uuid',
      primary: true,
      generated: 'uuid',
    },
    transactionId: {
      name: 'transaction_id',
      type: 'varchar',
      nullable: true,
    },
    transactionOriginId: {
      name: 'transaction_origin_id',
      type: 'varchar',
      nullable: true,
    },
    postingDate: {
      name: 'posting_date',
      type: 'timestamp',
      nullable: true,
    },
    transactionTypeCode: {
      name: 'transaction_type_code',
      type: 'varchar',
      nullable: true,
    },
    transactionDate: {
      name: 'transaction_date',
      type: 'timestamp',
      nullable: true,
    },
    creditEntry: {
      name: 'credit_entry',
      type: 'boolean',
      default: false,
    },
    summary: {
      type: 'varchar',
      nullable: true,
    },
    paymentInstrumentType: {
      name: 'payment_instrument_type',
      type: 'varchar',
      nullable: true,
    },
    paymentInstrumentTypeCode: {
      name: 'payment_instrument_type_code',
      type: 'integer',
      nullable: true,
    },
    paymentInstrument: {
      name: 'payment_instrument',
      type: 'varchar',
      nullable: true,
    },
    amount: {
      name: 'amount',
      type: 'numeric',
    },
    createdAt: {
      name: 'created_at',
      type: 'timestamp',
      default: () => 'now()',
    },
    updatedAt: {
      name: 'updated_at',
      type: 'timestamp',
      default: () => 'now()',
    },
    deletedAt: {
      name: 'deleted_at',
      type: 'timestamp',
      nullable: true,
    },
  },
  relations: {
    tag: {
      type: 'many-to-one',
      target: 'tags',
      joinColumn: {
        name: 'tag_id',
        referencedColumnName: 'id',
      },
    },
    disputes: {
      type: 'one-to-many',
      target: 'disputes',
      inverseSide: 'tag_transactions',
      joinColumn: {
        name: 'tag_transaction_id',
        referencedColumnName: 'id',
      },
    },
  },
});
