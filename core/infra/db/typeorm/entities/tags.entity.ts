import { ITag } from '@domain/tags/entities/tags.entity';
import { EntitySchema } from 'typeorm';

export const TagSchema = new EntitySchema<ITag>({
  name: 'tags',
  columns: {
    id: {
      type: 'uuid',
      primary: true,
      generated: 'uuid',
    },
    tagNumber: {
      name: 'tag_number',
      type: 'varchar',
    },
    tagStatus: {
      name: 'tag_status',
      type: 'integer',
    },
    nick_name: {
      name: 'nick_name',
      type: 'varchar',
      nullable: true,
    },
    motherBox: {
      name: 'mother_box',
      type: 'varchar',
      nullable: true,
    },
    childBox: {
      name: 'child_box',
      type: 'varchar',
      nullable: true,
    },
    requestedDate: {
      name: 'requested_date',
      type: 'timestamp',
      nullable: true,
    },
    sentDate: {
      name: 'sent_date',
      type: 'timestamp',
      nullable: true,
    },
    observation: {
      type: 'varchar',
      nullable: true,
    },
    bondDate: {
      name: 'bond_date',
      type: 'timestamp',
      nullable: true,
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
    value: {
      type: 'integer',
      nullable: true,
    },
  },
  relations: {
    tagTransactions: {
      type: 'one-to-many',
      target: 'tag_transactions',
      inverseSide: 'tag',
      joinColumn: {
        name: 'tag_id',
        referencedColumnName: 'id',
      },
    },
    vehicle: {
      target: 'vehicles',
      type: 'one-to-one',
      cascade: ['insert', 'update'],
      joinColumn: {
        name: 'vehicle_id',
      },
      nullable: true,
    },
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
