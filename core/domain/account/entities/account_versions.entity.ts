import { IAccount } from './account.entity';

export enum MoveTypeEnum {
  Born = 'born',
  Credit = 'credit',
  Debit = 'debit',
  Lock = 'lock',
  Unlock = 'unlock',
}

export interface IAccountVersions {
  id?: string;
  balance: number;
  locked?: number;
  available?: number;
  moveType?: MoveTypeEnum;
  tableName?: string;
  idTable?: string;
  createdAt?: Date;
  updatedAt?: Date;
  account: IAccount;
}
