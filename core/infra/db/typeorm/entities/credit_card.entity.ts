import { ICreditCard } from '@domain/cards/entities/credit_card.entity';
import { EntitySchema } from 'typeorm';

export const CredtCardSchema = new EntitySchema<ICreditCard>({
  name: 'credit_cards',
  columns: {
    id: {
      type: 'uuid',
      primary: true,
      generated: 'uuid',
    },
    cardNumber: {
      name: 'card_number',
      type: 'varchar',
    },
    cardDueDate: {
      name: 'card_due_date',
      type: 'timestamp',
    },
    cardCcv: {
      name: 'card_ccv',
      type: 'integer',
      nullable: true,
    },
    cardOwnerName: {
      name: 'card_owner_name',
      type: 'varchar',
      nullable: true,
    },
    cardOwnerDocument: {
      name: 'card_owner_document',
      type: 'varchar',
      nullable: true,
    },
    cardOwnerBornDate: {
      name: 'card_owner_born_date',
      type: 'timestamp',
      nullable: true,
    },
    nickName: {
      name: 'nick_name',
      type: 'varchar',
      nullable: true,
    },
    source: {
      name: 'source',
      type: 'varchar',
      nullable: true,
    },
    externalRef: {
      name: 'external_ref',
      type: 'varchar',
    },

    createdAt: { name: 'created_at', type: 'timestamptz', createDate: true },

    updatedAt: { name: 'updated_at', type: 'timestamptz', updateDate: true },

    deletedAt: {
      name: 'deleted_at',
      type: 'timestamptz',
      nullable: true,
      deleteDate: true,
    },
  },
  relations: {
    user: {
      type: 'many-to-one',
      target: 'users',
      joinColumn: {
        name: 'user_id',
        referencedColumnName: 'id',
      },
    },
  },
});
