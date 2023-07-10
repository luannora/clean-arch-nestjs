import { IAccount } from '@domain/account/entities/account.entity';
import { EntitySchema } from 'typeorm';

/// ColumnNumericTransformer
export class ColumnNumericTransformer {
  to(data: number): number {
    return data;
  }
  from(data: string): number {
    return parseFloat(data);
  }
}

export const AccountSchema = new EntitySchema<IAccount>({
  name: 'accounts',
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
    createdAt: { name: 'created_at', type: 'timestamptz' },
    updatedAt: { name: 'updated_at', type: 'timestamptz' },
  },
});
