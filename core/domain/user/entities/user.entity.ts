import { IAccount } from '@domain/account/entities/account.entity';
import { IAddress } from '@domain/address/entities/address.entity';
import { ICreditCard } from '@domain/cards/entities/credit_card.entity';
import { IPlan } from '@domain/plan/entities/plan.entity';
import { ITag } from '@domain/tags/entities/tags.entity';

export enum UserStatusEnum {
  PRE_REGISTERED = 'pre_registered',
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export enum UserRoleEnum {
  ADMIN = 'admin',
  USER = 'user',
  EMBOSSING = 'embossing',
}

export interface IUser {
  id?: string;
  name: string;
  fantasyName?: string;
  email: string;
  bornDate: Date;
  celphone?: string;
  telephone?: string;
  document?: string;
  documentType?: string;
  address?: IAddress;
  plan?: IPlan;
  account?: IAccount;
  createdAt: Date;
  updatedAt: Date;
  password?: string;
  status: UserStatusEnum;
  role: UserRoleEnum;
  code?: string;
  codeExpirationDate?: Date;
  temporaryPassword: string;
  update_temporary_pass: Date;
  tags?: ITag[]
  creditCards?: ICreditCard[]
}
