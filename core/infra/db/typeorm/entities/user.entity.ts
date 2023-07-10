import {
  IUser,
  UserRoleEnum,
  UserStatusEnum,
} from '@domain/user/entities/user.entity';
import { EntitySchema } from 'typeorm';

export const UserSchema = new EntitySchema<IUser>({
  name: 'users',
  columns: {
    id: { type: 'uuid', primary: true, generated: 'uuid' },
    name: { type: 'varchar', length: '255', nullable: false },
    fantasyName: {
      name: 'fantasy_name',
      type: 'varchar',
      length: '255',
      nullable: true,
    },
    email: { type: 'varchar', length: '255', nullable: false },
    bornDate: { name: 'born_date', type: 'date' },
    celphone: { type: 'varchar', length: '55', nullable: true },
    telephone: { type: 'varchar', length: '55', nullable: true },
    document: { type: 'varchar', length: '14', nullable: false },
    documentType: {
      name: 'document_type',
      type: 'varchar',
      length: '2',
      nullable: false,
    },
    createdAt: { name: 'created_at', type: 'timestamptz', createDate: true },
    updatedAt: { name: 'updated_at', type: 'timestamptz', updateDate: true },
    password: { type: 'varchar', length: '15', nullable: true },
    status: {
      type: 'varchar',
      length: '255',
      nullable: false,
      enum: UserStatusEnum,
    },
    role: {
      type: 'varchar',
      length: '255',
      nullable: false,
      enum: UserRoleEnum,
    },

    code: { type: 'varchar', length: '255', nullable: true, unique: true },
    codeExpirationDate: {
      name: 'code_expiration_date',
      type: 'date',
      nullable: true,
    },
    update_temporary_pass: { type: 'timestamptz' },
  },
  relations: {
    address: {
      target: 'addresses',
      type: 'one-to-one',
      cascade: ['insert', 'update'],
      joinColumn: {
        name: 'address_id',
      },
      nullable: true,
    },
    plan: {
      target: 'plans',
      type: 'one-to-one',
      cascade: ['insert', 'update'],
      joinColumn: {
        name: 'plan_id',
      },
      nullable: true,
    },
    account: {
      target: 'accounts',
      type: 'one-to-one',
      cascade: ['insert', 'update'],
      joinColumn: {
        name: 'account_id',
      },
      nullable: true,
    },
    tags: {
      target: 'tags',
      type: 'one-to-many',
      cascade: ['insert', 'update'],
      joinColumn: {
        name: 'tag_id',
      },
      nullable: true,
    },
    creditCards: {
      target: 'credit_cards',
      type: 'one-to-many',
      cascade: ['insert', 'update'],
      inverseSide: 'user',
      joinColumn: {
        name: 'credit_card_id',
      },
      nullable: true,
    },
  },
});
