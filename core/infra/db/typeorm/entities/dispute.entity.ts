import { IDispute } from '@domain/tags/entities/dispute.entity';
import { EntitySchema } from 'typeorm';

export const DisputeSchema = new EntitySchema<IDispute>({
  name: 'disputes',
  columns: {
    id: {
      type: 'uuid',
      primary: true,
      generated: 'uuid',
    },
    disputedTransactionChainId: {
      name: 'disputed_transaction_chain_id',
      type: 'varchar',
      nullable: true,
    },
    transactionAmount: {
      name: 'transaction_amount',
      type: 'integer',
      nullable: true,
    },
    disputeId: {
      name: 'dispute_id',
      type: 'varchar',
      nullable: true,
    },
    openDate: {
      name: 'open_date',
      type: 'timestamp',
      nullable: true,
    },
    referenceIdentifier: {
      name: 'reference_identifier',
      type: 'varchar',
      nullable: true,
    },
    requestDate: {
      name: 'request_date',
      type: 'timestamp',
      nullable: true,
    },
    requestReasonCode: {
      name: 'request_reason_code',
      type: 'integer',
      nullable: true,
    },
    requestReason: {
      name: 'request_reason',
      type: 'varchar',
      nullable: true,
    },
    requestDescription: {
      name: 'request_description',
      type: 'varchar',
      nullable: true,
    },
    category: {
      type: 'integer',
      nullable: true,
    },
    categoryName: {
      name: 'category_name',
      type: 'varchar',
      nullable: true,
    },
    amount: {
      type: 'integer',
      nullable: true,
    },
    processStatus: {
      name: 'process_status',
      type: 'varchar',
      nullable: true,
    },
    resultStatus: {
      name: 'result_status',
      type: 'varchar',
      nullable: true,
    },
    merchantInformationDate: {
      name: 'merchant_information_date',
      type: 'timestamp',
      nullable: true,
    },
    responseDate: {
      name: 'response_date',
      type: 'timestamp',
      nullable: true,
    },
    responseDescription: {
      name: 'response_description',
      type: 'varchar',
      nullable: true,
    },
    refundTransactionId: {
      name: 'refund_transaction_id',
      type: 'varchar',
      nullable: true,
    },
    refundAmount: {
      name: 'refund_amount',
      type: 'integer',
      nullable: true,
    },
    correctionTransactionId: {
      name: 'correction_transaction_id',
      type: 'varchar',
      nullable: true,
    },
    correctionAmount: {
      name: 'correction_amount',
      type: 'integer',
      nullable: true,
    },
  },
  relations: {
    tagTransaction: {
      type: 'many-to-one',
      target: 'tag_transactions',
      joinColumn: {
        name: 'tag_transaction_id',
        referencedColumnName: 'id',
      },
    },
  },
});
