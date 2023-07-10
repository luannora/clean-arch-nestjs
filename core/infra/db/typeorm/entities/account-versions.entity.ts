import { IAccountVersions } from '@domain/account/entities/account_versions.entity';
import { EntitySchema } from 'typeorm';
import { ColumnNumericTransformer } from './account.entity';

export const AccountVesionsSchema = new EntitySchema<IAccountVersions>({
  name: 'account_versions',
  columns: {
    id: { type: 'uuid', primary: true, generated: 'uuid' },
    available: {
      type: 'numeric',
      nullable: false,
      default: 0,
      transformer: new ColumnNumericTransformer(),
    },
    balance: {
      type: 'numeric',
      nullable: false,
      default: 0,
      transformer: new ColumnNumericTransformer(),
    },
    locked: {
      type: 'numeric',
      nullable: false,
      default: 0,
      transformer: new ColumnNumericTransformer(),
    },
    idTable: { name: 'id_table', type: 'uuid' },
    moveType: {
      name: 'move_type',
      type: 'varchar',
      length: 10,
      nullable: true,
    },
    tableName: { name: 'table_name', type: 'varchar', length: 255 },
    createdAt: { name: 'created_at', type: 'timestamptz' },
    updatedAt: { name: 'updated_at', type: 'timestamptz' },
  },
  relations: {
    account: {
      target: 'accounts',
      type: 'many-to-one',
      cascade: ['insert', 'update'],
      joinColumn: {
        name: 'account_id',
      },
      nullable: true,
    },
  },
});
