import { IVehicle } from '@domain/vehicle/entities/vehicle.entity';
import { ITagTransaction } from './tagTransaction.entity';
import { IUser } from '@domain/user/entities/user.entity';

export enum TagStatusEnum {
  Notassociated = 1,
  Active = 2,
  Blocked = 3,
  FreeForSale = 4,
  StolenVehicle = 5,
  temporarilyBlocked = 6,
  financiallyBlocked = 7,
  Canceled = 8,
  CanceledMisplaced = 9,
  CanceledChanged = 10,
}

export interface ITag {
  id?: string;
  tagNumber?: string;
  nick_name?: string;
  tagStatus?: number;
  motherBox?: string | null;
  childBox?: string | null;
  requestedDate?: Date | null;
  sentDate?: Date | null;
  observation?: string | null;
  bondDate?: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
  value?: number | null;
  vehicle?: IVehicle;
  tagTransactions?: ITagTransaction[];
  user?: IUser;
}
